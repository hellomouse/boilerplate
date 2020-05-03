module.exports = {
  extends: [
    'plugin:react/recommended',
    '@hellomouse/eslint-config-typescript'
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // typescript
    'react/prop-types': 'off'
  }
};
