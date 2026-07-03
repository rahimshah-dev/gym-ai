# @gymai/ui

Shared React Native component library, styled from `@gymai/design-tokens`. Ports the visual language of `apps/web-demo/index.html` into native components for `apps/mobile`.

```tsx
import { ThemeProvider, Button, Chip, Card } from "@gymai/ui";

<ThemeProvider>
  <Card>
    <Chip label="Full Body" selected onPress={() => {}} />
    <Button label="Generate My Workout" onPress={() => {}} />
  </Card>
</ThemeProvider>
```

Currently implemented: `ThemeProvider`/`useTheme`, `Button`, `Chip`, `Card`. See `AGENTS.md` in this directory for the full intended component inventory (ported from the mockup) and contribution rules.
