module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // 'plugin:eslint-plugin-pony-comments/recommended',
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    NodeJS: 'readonly',
    JQuery: 'readonly',
    VConsole: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    // 'header',
    'react',
    '@typescript-eslint'
    // 'pony-comments'
  ],
  rules: {
    'no-use-before-define': 'off',
    semi: [2, 'always']
    // 'pony-comments/no-jsx-component-comments': 2
    // 'pony-comments/no-function-comments': 2,
    // 'pony-comments/no-type-define-comments': 2,
    // 'pony-comments/empty-comments': 2
    // 'no-function-comments': [2]
    // 'header/header': [2, 'config/header.js']
  }
};
