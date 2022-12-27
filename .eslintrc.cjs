module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    'react/prop-types': 0,
    indent: ['error', 2],
    'linebreak-style': 1,
    quotes: ['error', 'single'],
    'no-console': [
      'warn',
      {
        allow: ['warn'],
      },
    ],
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    camelcase: [
      'error',
      {
        allow: ['unstable_batchedUpdates'],
      },
    ],
    'react/require-default-props': 'off',
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
