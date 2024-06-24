import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'], // Apply to JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettier.rules, // Add Prettier rules to the config
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'prettier/prettier': 'error', // Ensure Prettier errors are shown as ESLint errors
    },
  },
];
