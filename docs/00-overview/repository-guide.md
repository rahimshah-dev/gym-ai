# Mobile App Repository Navigation and Usage Guide

This guide explains how to navigate, use, and operate a production-grade repository for a cross-platform mobile app targeting iOS and Android. The recommended foundation is a monorepo with a root workspace plus `apps/*` and `packages/*`, which aligns with current Expo monorepo guidance and broader mobile monorepo practice.[cite:12][cite:3] The same structure works well for engineering teams, design teams, AI-assisted coding workflows, and stakeholder communication because it separates app code, shared systems, documentation, and delivery concerns into predictable places.[cite:4][cite:13]

## Repository mental model

The repository should be understood as six layers that work together: the app, shared packages, documentation, automation, AI instructions, and governance. Expo’s monorepo documentation describes the monorepo as a single repository containing multiple apps or packages, and recent React Native monorepo guidance highlights sharing code and tooling across packages as the main reason to use this pattern.[cite:12][cite:3]

The six layers are:

- `apps/`: runnable applications, including the main mobile app.
- `packages/`: reusable modules shared across the repository.
- `docs/`: durable knowledge for product, design, architecture, engineering, AI usage, and delivery.
- `.github/`, `scripts/`, `config/`: automation, CI/CD, and standards enforcement.
- `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.claude/`, `.github/copilot-instructions.md`: AI operating context and task instructions.[cite:17][cite:24]
- Root governance files such as `README.md`, `CODEOWNERS`, `SECURITY.md`, and contribution standards.

A new contributor should start at the root `README.md`, then move to `docs/00-overview/repo-map.md`, then open the app or package relevant to the task. AI agents should start with `AGENTS.md`, then the nearest nested `AGENTS.md`, then any tool-specific instructions for Claude, Cursor, or Copilot.[cite:17][cite:23][cite:24]

## Top-level navigation

A strong root structure reduces ambiguity. Expo supports monorepos across npm, pnpm, Yarn, and Bun, so the root should also contain the workspace and shared tool configuration needed to run all packages consistently.[cite:12]

### Root files

#### `README.md`
Use this as the front door of the repository.

It should contain:

- What the product is.
- Who the repo is for.
- How to install dependencies.
- How to run the mobile app.
- How to run checks such as lint, typecheck, and tests.
- Links to key docs.
- A short map of important folders.

Use it when:

- Onboarding a new engineer.
- Giving stakeholders a high-level orientation.
- Letting AI tools discover the repo quickly.

#### `package.json`
This is the root workspace command center.

It should contain:

- Workspace-wide scripts such as `dev`, `lint`, `test`, `typecheck`, `build`, and `docs:check`.
- Monorepo task orchestration hooks.
- Shared developer tooling dependencies if kept at root.

Use it when:

- Running commands from the repo root.
- Standardizing how humans and AI agents execute tasks.

#### `pnpm-workspace.yaml`
This declares which folders belong to the workspace.

Typical contents:

- `apps/*`
- `packages/*`

Use it when:

- Adding a new app or package.
- Debugging workspace resolution.

#### `turbo.json`
This defines task relationships, caching, and execution flow across the monorepo.

Use it when:

- Creating fast local and CI pipelines.
- Controlling which tasks depend on others.
- Making AI-generated changes cheaper to validate.

#### `tsconfig.base.json`
This is the shared TypeScript baseline for all apps and packages.

Use it when:

- Standardizing path aliases and compiler behavior.
- Making package imports consistent.

#### `CODEOWNERS`
This defines code ownership and review routing.

Use it when:

- Assigning approval responsibility.
- Protecting key areas like `packages/ui`, release workflows, and security files.

#### `SECURITY.md`
This explains how vulnerabilities are reported and handled.

Use it when:

- Setting expectations for responsible disclosure.
- Supporting enterprise or compliance-sensitive stakeholders.

## Apps section

The `apps/` directory contains runnable applications. In this structure, `apps/mobile` is the main iOS and Android application, and Expo’s monorepo examples treat apps as first-class workspace members inside the monorepo pattern.[cite:12]

### `apps/mobile`

This is the product itself. Everything here should focus on assembling the mobile experience, wiring features together, handling platform bootstrapping, and consuming shared packages.

Use this folder when:

- Building screens and routes.
- Wiring features into the app shell.
- Configuring platform-specific app behavior.
- Running the mobile app locally or in CI.

Recommended internal structure:

```text
apps/mobile/
├── app/
├── src/
├── assets/
├── ios/
├── android/
├── app.config.ts
├── eas.json
├── metro.config.js
├── package.json
├── tsconfig.json
├── babel.config.js
├── AGENTS.md
└── README.md
```

### `apps/mobile/app/`

This is the route layer if using Expo Router. Put route files, route groups, and screen entry points here.

Typical contents:

- `(auth)/`: sign-in, sign-up, password reset, verification routes.
- `(app)/`: authenticated app routes.
- `_layout.tsx`: shared layout, navigation wrappers, route guards, providers.
- `index.tsx`: app landing route.
- `modal.tsx`: modal route entry points.

Use it when:

- Changing route structure.
- Organizing tabs, stacks, and modal flows.
- Controlling layout-level providers and wrappers.

Guideline:

- Keep route files thin.
- Put reusable business and UI logic in `src/` or shared packages.

### `apps/mobile/src/`

This is the implementation layer for the mobile app. Use it for app-specific logic that should not live in a shared package.

Suggested subfolders and how to use them:

#### `bootstrap/`
Purpose: app startup logic.

Put here:

- App initialization.
- Font loading.
- Feature flag bootstrap.
- Error boundary initialization.
- Splash screen orchestration.
- Startup dependency registration.

Use it when:

- Changing what happens before the app becomes interactive.

#### `features/`
Purpose: feature-first organization of user-facing functionality.

Each feature folder should own:

- Feature screens.
- Feature hooks.
- View models or controllers.
- Feature-specific components.
- Feature-specific analytics events.
- Test files close to the feature.

Example:

```text
src/features/auth/
├── screens/
├── components/
├── hooks/
├── services/
├── state/
├── analytics/
└── __tests__/
```

Use it when:

- Building or modifying a product area such as onboarding, profile, checkout, or settings.

Guideline:

- Prefer adding feature-local code here before creating another global folder.

#### `flows/`
Purpose: multi-step experiences that cross feature boundaries.

Examples:

- Onboarding journey.
- Subscription purchase flow.
- Identity verification flow.

Use it when:

- A user experience spans several features and needs orchestration beyond a single screen.

#### `screens/`
Purpose: optional screen wrappers or legacy screen organization.

Use it when:

- There are app-level screens that do not belong cleanly to one feature.
- Migrating from an older flat screen structure.

Guideline:

- Keep this small; prefer feature-owned screens.

#### `navigation/`
Purpose: navigation configuration beyond route files.

Put here:

- Navigation helpers.
- Typed route definitions.
- Shared navigation options.
- Deep link mapping.

Use it when:

- Updating transitions, screen options, or route helper utilities.

#### `hooks/`
Purpose: app-wide reusable hooks.

Put here:

- Hooks used across several features but still app-specific.

Use it when:

- A hook is not generic enough for `packages/`, but too shared to live in one feature.

#### `providers/`
Purpose: React providers and app-wide context assembly.

Put here:

- Theme provider glue.
- Query client provider.
- Auth session provider.
- Analytics provider.

Use it when:

- Wiring dependencies into the app root.

#### `services/`
Purpose: app-local service integrations.

Put here:

- Device APIs.
- App-specific adapters.
- Integrations not appropriate for shared packages.

Use it when:

- A service depends on the app runtime or device capabilities directly.

#### `store/`
Purpose: app-level state assembly.

Put here:

- Store configuration.
- Root selectors.
- Shared app slices if not better owned by a feature.

Use it when:

- Managing cross-feature app state.

#### `analytics/`
Purpose: app event wiring.

Put here:

- Event dispatchers.
- Screen tracking bindings.
- App analytics middleware.

Use it when:

- Connecting feature events to a tracking provider.

#### `notifications/`
Purpose: push and local notification handling.

Put here:

- Registration flow.
- Notification permission prompts.
- Notification routing on tap.

Use it when:

- Handling mobile messaging behavior.

#### `permissions/`
Purpose: user permission handling.

Put here:

- Camera, location, notifications, photo library, microphone access helpers.

Use it when:

- Standardizing permission prompts and state checks.

#### `utils/`
Purpose: low-level app-specific helpers.

Use sparingly. Do not let this become a junk drawer.

Put here only:

- Small utility functions with no better home.

#### `config/`
Purpose: app runtime configuration.

Put here:

- Environment parsing.
- Feature flag values.
- App constants derived from env.

#### `constants/`
Purpose: stable constants that are not environment-derived.

Put here:

- Enum-like maps.
- Fixed keys.
- Screen IDs.

#### `types/`
Purpose: app-specific TypeScript types.

Put here:

- App-local interfaces and type helpers.

Guideline:

- Shared domain types should usually live in `packages/domain` or `packages/api` instead.

#### `test/`
Purpose: app-level test support.

Put here:

- Shared test wrappers.
- Global mocks.
- App integration test helpers.

### `apps/mobile/assets/`

This holds static assets used by the mobile app.

Subfolders:

- `fonts/`: brand and UI fonts.
- `icons/`: app icons and vector exports.
- `images/`: bitmaps and illustrations.
- `lottie/`: motion assets.
- `illustrations/`: product illustrations.

Use it when:

- Updating visual app resources.
- Managing what ships with the app bundle.

Guideline:

- Name assets predictably and document ownership for brand-critical files.

### `apps/mobile/ios/` and `apps/mobile/android/`

These are native project folders and should only exist or be edited when native customization is needed. Current monorepo React Native guidance notes that native tooling such as Metro and Gradle must be configured correctly in shared workspace setups, so these directories should be treated carefully and intentionally.[cite:3]

Use them when:

- Adding native modules.
- Editing bundle identifiers, native capabilities, app permissions, Gradle config, or Xcode project settings.
- Integrating platform-specific SDKs.

Guideline:

- Keep as much logic as possible outside native folders.
- Document every native change in architecture or engineering docs if it affects setup or release.

### `app.config.ts`

This is the app configuration source.

Use it when:

- Setting app name, scheme, bundle identifiers, icons, splash config, plugins, permissions, and environment-linked settings.

### `eas.json`

This defines build and submission profiles.

Use it when:

- Managing development, preview, staging, and production builds.
- Standardizing delivery pipelines.

### `apps/mobile/README.md`

This is the local handbook for mobile contributors.

It should explain:

- How to run the app.
- Which package dependencies it consumes.
- How routes and features are organized.
- What not to put directly in the app package.

### `apps/mobile/AGENTS.md`

This is the local AI operating guide for the mobile app.

It should explain:

- How route files are organized.
- How to add a new feature.
- Which shared packages to use first.
- Which validations to run after a change.
- What architectural boundaries must not be crossed.

Nested AGENTS.md files are recommended in monorepos so agents can read the nearest local instructions instead of relying only on root-level context.[cite:17][cite:23]

### `apps/storybook`

This is optional but valuable for UI development and design-system validation.

Use it when:

- Reviewing components in isolation.
- Testing visual states without navigating the full app.
- Supporting design QA and stakeholder reviews.

## Packages section

The `packages/` directory contains reusable modules shared across the repository. This is one of the main reasons to use a monorepo in the first place, and both Expo and recent React Native monorepo guides emphasize shared packages as a core benefit.[cite:12][cite:3]

A good rule is simple: if code can be reused, tested independently, versioned logically, or understood better outside the app shell, it probably belongs in `packages/`.

### `packages/ui`

This is the shared UI library.

Use it for:

- Primitives such as buttons, text, inputs, cards, and layout wrappers.
- Composed reusable components.
- Screen patterns shared across features.
- Theme hooks and visual system glue.
- Accessibility helpers.

Recommended structure:

```text
packages/ui/
├── src/
│   ├── primitives/
│   ├── components/
│   ├── patterns/
│   ├── icons/
│   ├── themes/
│   ├── tokens/
│   ├── accessibility/
│   └── index.ts
├── AGENTS.md
├── package.json
└── README.md
```

How to navigate it:

- `primitives/`: low-level building blocks.
- `components/`: reusable product-facing components.
- `patterns/`: common screen assemblies or repeated layouts.
- `icons/`: icon wrappers and exports.
- `themes/`: runtime theme composition.
- `tokens/`: package-local token bindings if needed.
- `accessibility/`: accessible props and helpers.

When to use it:

- When the same component appears in multiple features.
- When design-system consistency matters.
- When product teams need a canonical component API.

### `packages/design-tokens`

This is the single source of truth for design foundations.

Use it for:

- Color tokens.
- Typography scale.
- Spacing scale.
- Radius values.
- Motion durations and easing.
- Elevation and shadow semantics.
- Semantic aliases such as success, warning, and destructive states.

Recommended structure:

```text
packages/design-tokens/src/
├── color.ts
├── typography.ts
├── spacing.ts
├── radius.ts
├── motion.ts
├── elevation.ts
└── semantic.ts
```

How to use it:

- Designers and engineers align here first.
- UI components in `packages/ui` should consume tokens from here.
- Product features should not hardcode visual values when a token exists.

Why it matters:

- It creates consistency.
- It makes visual changes safer.
- It helps AI agents avoid inventing one-off design values.

### `packages/api`

This package owns network-facing logic.

Use it for:

- HTTP clients.
- Endpoint wrappers.
- Request/response schemas.
- DTOs and mappers.
- API model normalization.

Recommended structure:

```text
packages/api/src/
├── client/
├── endpoints/
├── models/
├── mappers/
├── schemas/
└── index.ts
```

How to navigate it:

- `client/`: low-level fetch or request client setup.
- `endpoints/`: named API functions grouped by resource.
- `models/`: transport-layer data shapes.
- `mappers/`: translation from API shapes to domain shapes.
- `schemas/`: validation for requests and responses.

Guideline:

- Do not put UI concerns here.
- Do not let screen components call raw fetch directly if the API package already covers the use case.

### `packages/domain`

This package owns business meaning.

Android’s app architecture guidance recommends clear separation of concerns, with a UI layer and data layer as standard, plus a domain layer when useful for reusable and testable business logic.[cite:13] This package is where business entities and use cases should live when they need to be independent from screens or transport details.[cite:13]

Use it for:

- Entities.
- Value objects.
- Use cases.
- Repository interfaces.
- Domain rules and policies.

How to navigate it:

- `entities/`: core business concepts.
- `value-objects/`: constrained domain values.
- `use-cases/`: actions such as `CreateOrder`, `CompleteOnboarding`, or `RefreshProfile`.
- `repositories/`: abstract contracts, not implementation details.

Guideline:

- Keep this package framework-light and UI-agnostic.

### `packages/state`

This package is optional but useful when state patterns are shared.

Use it for:

- Shared store slices.
- Selectors.
- State machines.
- Cross-feature state patterns.

Use it when:

- More than one app or several features need the same state logic.

### `packages/auth`

Use it for:

- Session abstractions.
- Auth client helpers.
- Token refresh policies.
- Account identity logic.

### `packages/config`

Use it for:

- Environment schemas.
- Configuration parsing.
- Shared constants derived from env or build context.

This helps keep runtime setup consistent across app code, scripts, and CI.

### `packages/analytics`

Use it for:

- Event definitions.
- Tracking wrappers.
- Provider-agnostic analytics interfaces.
- Naming standards for analytics events.

### `packages/notifications`

Use it for:

- Shared notification models and handlers.
- Notification formatting.
- Platform-independent notification contracts.

### `packages/storage`

Use it for:

- Storage abstractions.
- Cache interfaces.
- Secure storage access wrappers.

### `packages/i18n`

Use it for:

- Translation dictionaries.
- Locale helpers.
- Formatting and pluralization utilities.

### `packages/validation`

Use it for:

- Shared schemas.
- Reusable validation rules.
- Form-safe validation logic.

### `packages/eslint-config`

Use it for:

- Reusable lint presets across packages and apps.

### `packages/typescript-config`

Use it for:

- Reusable TypeScript config packages if preferred over a single base file.

### `packages/testing`

Use it for:

- Shared mocks.
- Custom render helpers.
- Factories and fixtures.
- Common test setup.

### `packages/tooling`

Use it for:

- Code generators.
- Build helpers.
- Internal tooling utilities.

### Package README and AGENTS files

Every important package should have:

- `README.md`: what the package is, public API, examples, and usage rules.
- `AGENTS.md`: what AI tools must understand before editing it, such as boundaries, naming conventions, and required validations.[cite:17][cite:24]

## Documentation section

The `docs/` directory is the durable memory of the product and the team. It should not be treated as optional, because the user request here explicitly needs a repository that supports both technical contributors and non-technical stakeholders.

Recommended structure:

```text
docs/
├── 00-overview/
├── 01-product/
├── 02-design/
├── 03-architecture/
├── 04-engineering/
├── 05-ai/
├── 06-delivery/
└── 07-templates/
```

### `docs/00-overview/`

This is the orientation layer.

Use it for:

- `product-one-pager.md`: short explanation of the product.
- `repo-map.md`: where everything lives.
- `stakeholder-guide.md`: plain-language explanation of how teams work in this repo.
- `glossary.md`: shared definitions.

Who should use it:

- New team members.
- Executives and stakeholders.
- AI agents needing a high-level map.

### `docs/01-product/`

This is the product strategy layer.

Use it for:

- Vision.
- Principles.
- Personas.
- User journeys.
- PRDs.
- Roadmaps.
- KPIs.

A PRD should define what a product or feature should do, who it is for, and how success will be measured, which makes it the right place for feature intent before implementation starts.[cite:25]

How to use it:

- Product managers write or update it first.
- Engineers and designers reference it before implementation.
- AI agents use it to align code generation with intended outcomes rather than only existing code.

### `docs/02-design/`

This is the design-system and UX source of truth.

Use it for:

- `design-system.md`: overall design philosophy and governance.
- `foundations/`: color, typography, spacing, iconography, motion, accessibility.
- `components/`: component anatomy, states, usage rules, do/don’t guidance.
- `patterns/`: flows and multi-component experiences.
- `content-guidelines.md`: voice and copy patterns.
- `handoff-checklist.md`: design-to-engineering readiness.

How to use it:

- Designers define the system here.
- Engineers implement from here.
- Stakeholders review consistency and brand quality here.
- AI tools should be directed here before creating UI.

### `docs/03-architecture/`

This is the technical strategy source of truth.

Use it for:

- `system-context.md`: systems and dependencies.
- `app-architecture.md`: layers, boundaries, and module relationships.
- `module-boundaries.md`: dependency rules.
- `state-management.md`: how state works and why.
- `offline-sync.md`: offline policies if needed.
- `security-privacy.md`: security and data handling.
- `performance.md`: app performance standards.
- `observability.md`: logging, metrics, and tracing.
- `adr/`: architecture decision records.

Architecture decision records are intended to capture significant decisions, including context, alternatives, and consequences, and Microsoft’s guidance also recommends keeping ADRs as a running record of key architectural choices.[cite:22][cite:28]

How to use ADRs:

- Add one when a change affects architecture, delivery model, or long-term constraints.
- Do not edit history casually; supersede with a new ADR if needed.

### `docs/04-engineering/`

This is the engineering operations handbook.

Use it for:

- Local setup.
- Coding standards.
- Testing strategy.
- Release process.
- CI/CD.
- Branching and versioning.
- Dependency policy.
- Incident runbooks.

How to use it:

- Engineers use it to work consistently.
- AI tools use it to know which commands and standards to follow.

### `docs/05-ai/`

This is the AI-assisted development handbook.

Use it for:

- `ai-development-playbook.md`: how AI is used in the repo.
- `prompting-guidelines.md`: good prompt patterns.
- `code-review-with-ai.md`: how AI helps review without replacing human approval.
- `repo-context-strategy.md`: how to provide context files.
- `allowed-tools.md`: approved tools and unsafe actions.
- `guardrails.md`: architectural and quality boundaries.
- `examples/`: prompt examples and response examples.
- `templates/`: reusable AI task templates.

This section is especially important because current AI repo guidance emphasizes explicit instruction files, local context, and keeping agent guidance accurate so tools do not work from stale assumptions.[cite:18][cite:24][cite:29]

### `docs/06-delivery/`

This is the shipping and support layer.

Use it for:

- Environment definitions.
- App Store and Play Store release procedures.
- Beta distribution process.
- QA checklists.
- Support handoff.

Recent mobile CI/CD guidance describes automated build, test, and release handling for iOS and Android as a core part of modern mobile delivery, so this section should describe that operational flow clearly.[cite:10][cite:4]

### `docs/07-templates/`

This is the reusable document toolkit.

Use it for:

- PRD templates.
- ADR templates.
- Feature spec templates.
- Bug report templates.
- Release templates.

Use it when:

- Starting a new document without reinventing the format.

## AI instruction section

This repository should support several AI tools without mixing all instructions into one place. Recent guidance and ecosystem patterns show growing use of `AGENTS.md` as a general repo instruction file, alongside tool-specific files such as `CLAUDE.md` and GitHub Copilot instructions.[cite:17][cite:20][cite:24]

### `AGENTS.md`

This is the root universal AI guide.

Put here:

- Product mission.
- Repo map.
- Architecture boundaries.
- How to run validation.
- Documentation update rules.
- Coding conventions.
- Common mistakes to avoid.

How to use it:

- Every AI session should read this first.
- Keep it concise, explicit, and operational.

### `CLAUDE.md`

This is the Claude-specific instruction layer.

Put here:

- Preferred planning behavior.
- How to structure edits.
- Required docs updates.
- Repo-specific task recipes.
- Commands Claude should run before and after changes.

How to use it:

- As the playbook for Claude Code.
- As the place for workflow expectations not relevant to all AI tools.

### `.github/copilot-instructions.md`

This is the Copilot-specific instruction file.

Use it for:

- Brief guardrails.
- Coding standards references.
- Preferred patterns.

### `.cursor/rules/`

This contains scoped Cursor rules.

Example files:

- `00-global.mdc`: repo-wide rules.
- `10-mobile-app.mdc`: app package rules.
- `20-design-system.mdc`: design package rules.
- `30-testing.mdc`: test rules.
- `40-docs-adr.mdc`: docs and ADR writing rules.

How to use it:

- Keep rules modular.
- Scope rules by concern so the editor applies relevant context only.

### `.claude/commands/`

This contains reusable task prompts or command recipes.

Examples:

- `implement-feature.md`
- `write-adr.md`
- `refactor-module.md`
- `release-checklist.md`

Use it when:

- Standardizing recurring AI tasks.

### `.claude/agents/`

This defines specialized sub-agent roles.

Examples:

- `mobile-architect.md`
- `ui-engineer.md`
- `qa-release.md`
- `docs-stakeholder.md`

Use it when:

- Splitting work between specialized AI roles.
- Giving consistent responsibilities to agent personas.

## Automation and operations

Automation should live in predictable places so humans and AI tools know where operational logic belongs.

### `.github/workflows/`

This is the CI/CD pipeline directory.

Suggested workflows:

- `ci.yml`: install, lint, typecheck, unit tests.
- `mobile-preview.yml`: preview or internal build generation.
- `release-ios.yml`: iOS release automation.
- `release-android.yml`: Android release automation.
- `docs-check.yml`: markdown, links, docs conventions.
- `ai-governance.yml`: checks for required AI context files.

Recent 2026 mobile CI/CD material frames CI/CD as the automation of building, testing, and shipping mobile apps, which makes this directory a core part of repo reliability rather than a side concern.[cite:10][cite:4]

How to use it:

- Engineers update workflows when process changes.
- Stakeholders can review delivery maturity here.
- AI agents should never create duplicate ad hoc release flows outside this folder.

### `scripts/`

This is the operational utility directory.

Examples:

- `bootstrap.sh`: local setup.
- `doctor.sh`: environment verification.
- `validate.sh`: local full validation.
- `release-ios.sh`: release helper.
- `release-android.sh`: release helper.
- `sync-tokens.ts`: design token synchronization.
- `generate-icons.ts`: icon generation or checks.
- `update-agent-context.ts`: keep AI docs consistent.

How to use it:

- Put repeatable repo operations here, not in tribal knowledge.
- Reference these scripts from docs and AI instructions.

### `config/`

This holds configuration that should not be buried inside random packages.

Examples:

- `eslint/`
- `prettier/`
- `commitlint/`
- `semantic-release/`
- `danger/`

Use it when:

- Centralizing standards tooling.
- Making repo rules more discoverable.

## High-level user flows

The repository should support different audiences. A strong structure is not only about folders, but about making the right path obvious for each kind of user.

### For engineers

Recommended navigation flow:

1. Read root `README.md`.
2. Read `docs/00-overview/repo-map.md`.
3. Read `docs/04-engineering/local-development.md`.
4. Open `apps/mobile/README.md`.
5. Inspect the relevant feature under `apps/mobile/src/features/`.
6. Check any shared package used by that feature.
7. Run validation scripts before and after changes.

### For designers

Recommended navigation flow:

1. Read `docs/02-design/design-system.md`.
2. Review `docs/02-design/foundations/`.
3. Review `packages/design-tokens`.
4. Review `packages/ui`.
5. Use `apps/storybook` or similar playground if present.

### For product managers

Recommended navigation flow:

1. Read `docs/00-overview/product-one-pager.md`.
2. Read `docs/01-product/vision.md` and relevant PRDs.
3. Read `docs/00-overview/stakeholder-guide.md`.
4. Check `docs/06-delivery/` for release progress.

### For stakeholders and non-technical reviewers

Recommended navigation flow:

1. Start in `docs/00-overview/`.
2. Read `stakeholder-guide.md`.
3. Read the relevant PRD in `docs/01-product/prd/`.
4. Read plain-language architecture summaries in `docs/03-architecture/`.
5. Review delivery status in `docs/06-delivery/`.

### For AI agents

Recommended navigation flow:

1. Read root `AGENTS.md`.
2. Read `CLAUDE.md` or the tool-specific instruction file.
3. Read nearest local `AGENTS.md` in the target app or package.
4. Read relevant docs in `docs/02-design/`, `docs/03-architecture/`, and `docs/04-engineering/` depending on the task.
5. Execute required validation commands.
6. Update docs when architectural, design, or workflow changes are introduced.

## Field-by-field guidance for key documents

This section explains what each important document field should contain.

### PRD fields

A practical PRD should cover purpose, scope, users, requirements, and success measures so teams can align on what is being built and why.[cite:25]

Recommended fields:

- `Title`: feature or initiative name.
- `Problem`: what issue exists now.
- `Goal`: desired outcome.
- `Non-goals`: what is explicitly out of scope.
- `Users`: who this serves.
- `User stories`: user-centered scenarios.
- `Requirements`: functional expectations.
- `Non-functional requirements`: performance, privacy, accessibility, reliability.
- `Success metrics`: how success is measured.
- `Dependencies`: systems, approvals, or teams required.
- `Risks`: known concerns.
- `Open questions`: unresolved topics.
- `Status`: draft, approved, in progress, shipped.

### ADR fields

ADR guidance commonly expects context, decision, alternatives, and consequences so future contributors can understand why a path was chosen.[cite:22][cite:28]

Recommended fields:

- `ADR number`
- `Title`
- `Status`
- `Date`
- `Context`
- `Decision`
- `Alternatives considered`
- `Consequences`
- `Follow-up actions`

### Design component doc fields

Recommended fields:

- `Component name`
- `Purpose`
- `When to use`
- `When not to use`
- `Variants`
- `States`
- `Props/API`
- `Accessibility notes`
- `Content guidance`
- `Examples`
- `Ownership`

### AI guide fields

Recommended fields:

- `Task type`
- `Recommended context files`
- `Required validation`
- `Preferred output shape`
- `Do not do`
- `Escalation rules`
- `Example prompt`
- `Example acceptable result`

## Governance rules for using the repo well

The value of the structure depends on strong usage discipline.

Use these rules:

- New product work starts in `docs/01-product/` before code.
- New design patterns start in `docs/02-design/` and `packages/design-tokens` or `packages/ui` before feature duplication.
- New architectural choices get an ADR in `docs/03-architecture/adr/`.[cite:22][cite:28]
- Shared logic moves to `packages/` instead of being copied into several features.[cite:12][cite:3]
- Every major package and app gets a local `README.md` and `AGENTS.md`.[cite:17][cite:23]
- Delivery changes must update `docs/06-delivery/` and the relevant GitHub workflow.
- AI instruction changes should be versioned and reviewed just like source code because stale AI context reduces quality and predictability.[cite:18][cite:24]

## Suggested onboarding sequence

A practical onboarding path should move from product understanding to architecture, then to code and tooling.

Recommended first-day sequence:

1. Read root `README.md`.
2. Read `docs/00-overview/product-one-pager.md`.
3. Read `docs/00-overview/repo-map.md`.
4. Read `docs/04-engineering/local-development.md`.
5. Run `scripts/bootstrap.sh` and `scripts/doctor.sh`.
6. Open `apps/mobile/README.md`.
7. Open one real feature under `apps/mobile/src/features/`.
8. Open `packages/ui` and `packages/design-tokens`.
9. Read root `AGENTS.md` and `CLAUDE.md` if using AI coding.
10. Review one ADR to understand how decisions are recorded.[cite:22][cite:28]

## Practical maintenance advice

The repository will only stay useful if it remains current.

Maintenance practices:

- Review `repo-map.md` every time major structure changes.
- Review `AGENTS.md` and `CLAUDE.md` when workflows or architecture change.[cite:18][cite:24]
- Archive obsolete docs instead of silently leaving wrong guidance in place.
- Keep examples and templates close to real practice.
- Prefer shorter, accurate docs over long, stale docs.

## Final operating principle

The repository should make the correct path the easiest path. Current monorepo and AI instruction guidance both point in the same direction: clear boundaries, shared packages, explicit operational docs, and localized context files make both human teams and AI agents more effective.[cite:12][cite:3][cite:17][cite:24]
