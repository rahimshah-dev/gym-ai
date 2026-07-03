# QA Checklists

## Every release
- [ ] Golden path: photo/text equipment → plan → guided session → completion, on both a physical iOS device and an Android device.
- [ ] Guided-session timer survives backgrounding (lock the screen mid-set and mid-rest, confirm the alert still fires and the displayed time is correct on return) — see `docs/01-product/journeys/core-flows.md` §3.
- [ ] VoiceOver / TalkBack pass on any new or changed screen.
- [ ] Dynamic Type at largest accessibility size doesn't break layout on any new or changed screen.
- [ ] Dark mode and light mode both checked for any new or changed screen.
- [ ] Offline/poor-network behavior: generation request with no network shows the correct error, doesn't hang.
- [ ] No secrets in the built app bundle (spot-check: search the built JS bundle for anything resembling an API key).

## Before App Store / Play submission specifically
- [ ] Sign in with Apple present and working if Google/email login is present.
- [ ] Medical/professional-advice disclaimer shown before first AI generation.
- [ ] Camera/photo library permission strings accurately describe usage.
- [ ] Subscription purchase + restore-purchases flow tested in sandbox.
- [ ] Account deletion flow works end-to-end (App Store requirement for apps with account creation).
