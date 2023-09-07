module.exports = {
  root: false,

  rules: {
    'quote-props': ['error', 'as-needed'],
    'vue/define-macros-order': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    'unused-imports/no-unused-imports': 'off',

    'no-restricted-syntax': [
      'error',
      {
        message: 'Using \'emit\' is not allowed.',
        selector: '[name=emit]',
      },
    ],
    'vue/no-restricted-syntax': [
      'error',
      {
        message: 'Using \'$emit\' is not allowed.',
        selector: '[name=$emit]',
      },
    ],
  },

}
