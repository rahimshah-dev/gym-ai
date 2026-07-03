# @gymai/domain

Core business entities (`WorkoutPlan`, `Exercise`, `WorkoutSession`, `User`), value objects (`GenerationQuota`), repository interfaces, and pure use-cases. No UI, no HTTP, no React Native — importable from anywhere in the workspace, including future backend services.

```ts
import { checkGenerationAllowed, type GenerationQuota } from "@gymai/domain";

const decision = checkGenerationAllowed(quota);
```

See `AGENTS.md` in this directory for architectural boundaries (this package must stay platform-agnostic).
