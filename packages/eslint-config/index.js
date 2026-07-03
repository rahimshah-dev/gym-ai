/**
 * Shared ESLint config for the monorepo. Extends the Expo/React Native
 * community base and layers on the architecture boundary rules called out
 * in root AGENTS.md (enforced here via import/no-restricted-paths once
 * package boundaries stabilize past the scaffold stage).
 */
module.exports = {
  extends: ["universe/native"],
  rules: {
    // TODO: add eslint-plugin-import "no-restricted-paths" rules encoding
    // root AGENTS.md's dependency-direction table (packages/domain must not
    // import react-native, packages/ui must not import @gymai/api, etc.)
    // once the packages have enough real code to make the rule meaningful.
  }
};
