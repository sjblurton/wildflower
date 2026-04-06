export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
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
