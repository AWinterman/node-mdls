module.exports = {
    extends: [
      'eslint:recommended'
    ],
    env: {
      es6: true,
      node: true
    },
    overrides: [
      {
        files: ['test.js'],
        rules: {
          'no-console': 'off'
        }
      }
    ],
    parserOptions: {
      ecmaVersion: 2017
    },
    rules: {
    }
  };
