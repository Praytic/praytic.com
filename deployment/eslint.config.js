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
      // Prevent cross-imports between subdirectories
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // grockery module restrictions - cannot import from other subdirs
            {
              target: './grockery/**/*',
              from: ['./places/**/*', './portfolio/**/*'],
              message: 'grockery module cannot import from other subdirectories (places, portfolio)',
            },
            // places module restrictions - cannot import from other subdirs
            {
              target: './places/**/*',
              from: ['./grockery/**/*', './portfolio/**/*'],
              message: 'places module cannot import from other subdirectories (grockery, portfolio)',
            },
            // portfolio module restrictions - cannot import from other subdirs
            {
              target: './portfolio/**/*',
              from: ['./grockery/**/*', './places/**/*'],
              message: 'portfolio module cannot import from other subdirectories (grockery, places)',
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