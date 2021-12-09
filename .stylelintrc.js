module.exports = {
  root: true,
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-recess-order"],
  rules: {
    "block-no-empty": null,
    "no-empty-source": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin"
        ]
      }
    ],
  },
}

