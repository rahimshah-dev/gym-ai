# AGENTS.md — apps/storybook

Optional component playground for `packages/ui`. Not required for the product to ship — exists so design-system components can be built/reviewed in isolation without running the full `apps/mobile` app.

## Status
Not yet wired up. When needed (typically once `packages/ui` has more than a couple of components and iterating via `apps/mobile` becomes slow), install `@storybook/react-native` here and add stories colocated with components in `packages/ui/src/components/*`.

## Rules
- This app must not contain product logic — it only renders `packages/ui` components with mock props. If you find yourself writing business logic here, it belongs in `packages/domain` or a feature in `apps/mobile` instead.
