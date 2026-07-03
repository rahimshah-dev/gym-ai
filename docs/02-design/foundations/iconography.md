# Foundation — Iconography

The web mockup uses Lucide icons via CDN (`unpkg.com/lucide`). The native equivalent needs to be decided — likely `lucide-react-native` (keeps the exact same icon set/visual language) or a bundled icon font if bundle size becomes a concern.

**Status:** not yet decided. Record the decision as an ADR (`docs/03-architecture/adr/`) once `packages/ui/src/icons/` gets its first real icon component, since "which icon library" is exactly the kind of decision that should be recorded rather than silently inferred from whichever package happens to get installed first.
