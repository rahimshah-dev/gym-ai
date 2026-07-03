require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '12mb' }));
app.use(express.static(__dirname));

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

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

function parseDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) return null;
  return { mimeType: match[1], data: match[2] };
}

app.post('/api/generate-plan', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY. Add it to .env and restart.' });
  }

  const { equipmentMode, equipmentText, equipmentImage, time, focus, goal, level } = req.body || {};
  const promptText = buildPrompt({ time, focus, goal, level });

  const parts = [];
  if (equipmentMode === 'photo' && equipmentImage) {
    const image = parseDataUrl(equipmentImage);
    if (!image) {
      return res.status(400).json({ error: 'Equipment photo could not be read. Please try a different image.' });
    }
    parts.push({ text: promptText });
    parts.push({ inline_data: { mime_type: image.mimeType, data: image.data } });
  } else {
    parts.push({ text: `${promptText}\n\nEquipment available: ${equipmentText || ''}` });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: 'You are an expert certified personal trainer. Return ONLY valid JSON with no markdown, no code blocks, no extra text.'
              }
            ]
          },
          contents: [{ role: 'user', parts }],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.7,
            thinkingConfig: { thinkingBudget: 0 }
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errorBody = await geminiRes.json().catch(() => null);
      console.error(`Gemini ${geminiRes.status}:`, errorBody?.error ?? errorBody);
      const status = geminiRes.status;
      const geminiStatus = errorBody?.error?.status;

      if (status === 400 && geminiStatus === 'INVALID_ARGUMENT') {
        return res.status(401).json({ error: 'AI service authentication failed. Check the server API key.' });
      }
      if (status === 403) {
        return res.status(401).json({ error: 'AI service authentication failed. Check the server API key.' });
      }
      if (status === 429) {
        return res.status(429).json({ error: 'Rate limit reached. Wait a moment and try again.' });
      }
      return res.status(502).json({ error: 'Could not reach the AI service. Please try again.' });
    }

    const data = await geminiRes.json();
    const candidate = data.candidates?.[0];

    if (!candidate || candidate.finishReason === 'SAFETY') {
      return res.status(422).json({ error: 'AI could not generate a plan from this input. Please try again.' });
    }

    let raw = (candidate.content?.parts?.[0]?.text || '').trim();
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');

    let plan;
    try {
      plan = JSON.parse(raw);
    } catch (parseErr) {
      console.error('Gemini raw output (unparseable):', raw);
      return res.status(422).json({ error: 'AI returned an unexpected format. Please try again.' });
    }

    res.json({ plan });
  } catch (err) {
    console.error('Gemini request failed:', err);
    res.status(502).json({ error: 'Could not connect. Check your connection.' });
  }
});

const PORT = process.env.PORT || 8420;
app.listen(PORT, () => console.log(`GymAI Coach running at http://localhost:${PORT}`));
