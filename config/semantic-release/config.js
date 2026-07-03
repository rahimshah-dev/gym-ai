/**
 * Not currently active — see docs/04-engineering/release-process.md
 * "Versioning": apps/mobile's versioning is EAS-managed, and packages/*
 * are internal workspace-only, so semantic-release has nothing to publish
 * yet. Kept as a scaffold for if/when a package is extracted for
 * independent publishing.
 */
module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator"
  ]
};
