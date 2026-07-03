# Testing Strategy

## Where tests live
Colocated with source (`*.test.ts` next to the file it tests) in each package/app. Shared fixtures come from `@gymai/testing` (e.g. `makeFakeWorkoutPlan()`) rather than each test file hand-rolling its own.

## What to prioritize, by package
- **`packages/domain`** — the highest-value tests in the repo. Pure functions, no mocking needed (e.g. `checkGenerationAllowed`). Should have close to 100% coverage since there's no excuse not to.
- **`packages/api`** — test DTO→domain mapping (`toWorkoutPlan`) and schema validation (`generatePlanResponseSchema`) against both valid and malformed AI responses — the malformed case matters because the AI is a real-world source of "the shape is wrong" failures (see `apps/web-demo/server.js`'s own JSON.parse try/catch).
- **`packages/ui`** — snapshot/interaction tests for components with meaningful logic (e.g. `Chip`'s selected state), not for every trivial primitive.
- **`apps/mobile`** — the guided-session timer (`app/(app)/session.tsx` once implemented) needs explicit test coverage for the backgrounding/foregrounding recompute logic — this is the single highest-risk regression area in the product (`docs/01-product/journeys/core-flows.md` §3) and should not rely on manual QA alone.

## What NOT to test
- Don't write tests that just re-assert TypeScript's type system (e.g. "does this function accept a string").
- Don't snapshot-test every component's default render — snapshot tests that never fail meaningfully just add CI time and noise.

## Running tests
```bash
pnpm test          # turbo run test, whole workspace
pnpm --filter @gymai/domain test   # just one package
```
