export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin', 'theme', 'utility', 'variant', 'source', 'config'],
      },
    ],
    'import-notation': null,
  },
};
