# Local Development

## Prerequisites
- Node.js >= 20, pnpm 9 (`corepack enable`)
- Xcode + iOS Simulator (for `apps/mobile` iOS)
- Android Studio + an emulator image (for `apps/mobile` Android)

## Whole-workspace setup
```bash
pnpm install
pnpm bootstrap   # scripts/bootstrap.sh
pnpm dev         # turbo run dev --parallel — runs every app's dev task
```

## Running just the investor demo
No mobile toolchain required:
```bash
cd apps/web-demo
npm install
cp .env.example .env   # add OPENAI_API_KEY
npm start
```
Serves on `http://localhost:8420` (configurable via `PORT` in `.env`).

## Running just the mobile app
```bash
cd apps/mobile
npx expo install   # first time only — resolves real dependency versions
pnpm dev           # or: npx expo start
```
Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go on a physical device (managed workflow — no native build needed for most development).

## Environment variables
Every app/package that needs secrets has its own `.env.example` — copy to `.env` and fill in real values. Never commit a real `.env` (enforced by root `.gitignore`).

## Common issues
- **"module not found" for a `@gymai/*` package:** run `pnpm install` from the repo root, not inside the individual app — pnpm workspaces resolve `workspace:*` dependencies from the root.
- **Metro can't resolve a workspace package inside `apps/mobile`:** check `apps/mobile/metro.config.js` — it needs `watchFolders` pointed at the workspace root for monorepo resolution to work.
