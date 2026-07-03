# App Store / Play Store Release

## Apple App Store — known requirements for this product specifically
- **Sign in with Apple is mandatory** the moment any other third-party login (Google) exists — guideline 4.8. Ship both together.
- **Health/fitness AI disclaimer required** — the "not medical advice, consult a professional" disclaimer must be visible before first use of AI-generated content, not buried in settings (see `docs/01-product/prd/gymai-coach-prd.md` §8).
- **Camera/photo library usage strings** must clearly explain why (already drafted in `apps/mobile/app.config.ts`'s `infoPlist` — refine if the actual UX copy differs).
- **In-app purchase must use StoreKit** (via RevenueCat) — no external payment links for the subscription.

## Google Play
- Equivalent data-safety disclosures for camera/photo access and any health-adjacent data collected.
- Play Billing (via RevenueCat) for the subscription, matching the iOS flow.

## Store listing assets
Can reuse/extend `apps/web-demo/index.html`'s visual language (hero imagery, color, typography) for screenshots and marketing copy — don't design store assets from scratch when the mockup already establishes the visual identity.

## Pre-submission checklist
See `docs/06-delivery/qa-checklists.md` — run the full checklist before every submission, not just the first one.
