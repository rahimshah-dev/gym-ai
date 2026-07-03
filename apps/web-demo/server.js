require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '12mb' }));
app.use(express.static(__dirname));

function buildPrompt({ time, focus, goal, level }) {
  const timeDesc = time ? `${time} minutes` : 'AI-recommended optimal duration';
  return `Analyze the gym equipment provided. Create a complete workout plan:
- Time: ${timeDesc}
- Focus: ${focus || 'Full Body'}
- Goal: ${goal || 'General Fitness'}
- Level: ${level || 'Intermediate'}

Return this EXACT JSON (no markdown wrapping):
{
  "total_minutes": number,
  "focus": "string",
  "goal": "string",
  "level": "string",
  "equipment_identified": ["array of equipment"],
  "warmup_note": "one sentence warmup tip",
  "exercises": [
    {
      "name": "Exercise Name",
      "muscle_group": "Primary Muscle",
      "sets": number,
      "reps": "12 or 45 sec",
      "rest_seconds": number,
      "set_duration_seconds": number,
      "instructions": ["step 1", "step 2", "step 3"]
    }
  ],
  "cooldown_note": "one sentence cooldown tip"
}
Rules:
- 4-8 exercises
- set_duration_seconds: realistic active time per set (30-90s for reps, actual seconds for timed)
- Total plan must fit within the requested time
- If time is not specified, recommend the optimal duration`;
}

app.post('/api/generate-plan', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing OPENAI_API_KEY. Add it to .env and restart.' });
  }

  const { equipmentMode, equipmentText, equipmentImage, time, focus, goal, level } = req.body || {};
  const promptText = buildPrompt({ time, focus, goal, level });

  let userContent;
  if (equipmentMode === 'photo' && equipmentImage) {
    userContent = [
      { type: 'text', text: promptText },
      { type: 'image_url', image_url: { url: equipmentImage } }
    ];
  } else {
    userContent = `${promptText}\n\nEquipment available: ${equipmentText || ''}`;
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert certified personal trainer. Return ONLY valid JSON with no markdown, no code blocks, no extra text.' },
          { role: 'user', content: userContent }
        ],
        max_tokens: 2000
      })
    });

    if (!openaiRes.ok) {
      if (openaiRes.status === 401) return res.status(401).json({ error: 'AI service authentication failed. Check the server API key.' });
      if (openaiRes.status === 429) return res.status(429).json({ error: 'Rate limit reached. Wait a moment and try again.' });
      return res.status(502).json({ error: 'Could not reach the AI service. Please try again.' });
    }

    const data = await openaiRes.json();
    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');

    let plan;
    try {
      plan = JSON.parse(raw);
    } catch (parseErr) {
      return res.status(422).json({ error: 'AI returned an unexpected format. Please try again.' });
    }

    res.json({ plan });
  } catch (err) {
    res.status(502).json({ error: 'Could not connect. Check your connection.' });
  }
});

const PORT = process.env.PORT || 8420;
app.listen(PORT, () => console.log(`GymAI Coach running at http://localhost:${PORT}`));
