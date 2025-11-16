import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ['test.js'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    rules: {
    }
  }
];
