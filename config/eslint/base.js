/**
 * Base ESLint rules shared beyond what @gymai/eslint-config's Expo/RN
 * preset covers — e.g. for plain Node packages like packages/domain that
 * don't need the React Native preset at all.
 */
module.exports = {
  env: { node: true, es2022: true },
  extends: ["eslint:recommended"],
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
  }
};
