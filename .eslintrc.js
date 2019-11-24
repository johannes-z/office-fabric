module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript',
  ],

  rules: {
    // fixes eslint crashes when parsing indents
    indent: "off",
    '@typescript-eslint/indent': [
      'error',
      2
    ],

    'generator-star-spacing': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 2,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": false
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
