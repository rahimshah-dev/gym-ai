# @gymai/design-tokens

Platform-agnostic design tokens (color, typography, spacing, radius, motion, elevation), ported from `apps/web-demo/index.html`'s CSS custom properties. Consumed by `packages/ui`.

```ts
import { spacing, semanticColors } from "@gymai/design-tokens";

const colors = semanticColors("dark");
```

See `AGENTS.md` in this directory for update rules, and `docs/02-design/foundations/` for the design rationale behind each token category.
