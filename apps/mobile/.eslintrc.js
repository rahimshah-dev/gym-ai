module.exports = {
  extends: ["@gymai/eslint-config"],
  ignorePatterns: ["node_modules/", ".expo/"],
  overrides: [
    {
      files: [
        "*.config.js",
        ".eslintrc.js",
        "babel.config.js",
        "metro.config.js",
      ],
      env: { node: true },
    },
  ],
};
