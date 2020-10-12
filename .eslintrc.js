module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript',
  ],

  rules: {
    // fixes eslint crashes when parsing indents
    indent: 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
    'no-prototype-builtins': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'standard/no-callback-literal': 0,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    'generator-star-spacing': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
      multiline: {
        max: 1,
        allowFirstLine: true,
      },
    }],
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'import/export': 'off',
  },

  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
}
