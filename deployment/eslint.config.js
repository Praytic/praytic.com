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
              from: ['./places/**/*'],
              message: 'grockery module cannot import from other subdirectories (places)',
            },
            {
              target: './places/**/*',
              from: ['./grockery/**/*'],
              message: 'places module cannot import from other subdirectories (grockery)',
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
