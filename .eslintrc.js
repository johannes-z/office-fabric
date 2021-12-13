module.exports = {
  root: true,

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript',
  ],

  plugins: [
    'eslint-plugin-html',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    indent: 0,
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
    quotes: [1, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    // unused vars
    'no-unused-vars': 0,
    'vue/no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],

    // false positives
    'vue/valid-v-slot': 0,

    'generator-star-spacing': ['error', { before: false, after: true }],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'vue/no-v-html': 1,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'beside',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
      multiline: 1,
    }],
    'vue/no-parsing-error': 2,
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
