# Content Guidelines (UX copy)

- **Tone:** direct, encouraging, no filler. Match the mockup's existing copy voice — e.g. "Recover. Breathe." on the rest overlay, "Workout Complete!" on completion — short, declarative, not overly cheerful or corporate.
- **Error messages** state what went wrong and what to do next in one sentence — see `apps/web-demo/server.js`'s error mapping (401 → "AI service authentication failed", 429 → "Rate limit reached. Wait a moment and try again.") as the existing pattern to match.
- **Disclaimers** must be unambiguous, not hedged into vagueness — the required medical/professional-advice disclaimer (`docs/01-product/prd/gymai-coach-prd.md` §8) should read as a clear statement, not buried legalese.
- **All copy is string-keyed** through `packages/i18n` from day one — no inline string literals in components, even though v1 is English-only (see `packages/i18n/README.md`).
