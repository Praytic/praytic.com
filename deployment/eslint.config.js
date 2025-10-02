const path = require('path');

module.exports = [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      import: require('eslint-plugin-import'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './grockery/**/*',
              from: ['./places/**/*', './homepage/**/*'],
              message: 'grockery module cannot import from other subdirectories (places, homepage)',
            },
            {
              target: './places/**/*',
              from: ['./grockery/**/*', './homepage/**/*'],
              message: 'places module cannot import from other subdirectories (grockery, homepage)',
            },
            {
              target: './homepage/**/*',
              from: ['./grockery/**/*', './places/**/*'],
              message: 'homepage module cannot import from other subdirectories (grockery, places)',
            },
          ],
        },
      ],
      // Additional import-related rules
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];
