module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react/jsx-runtime'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    // 'react/react-in-jsx-scope': 'off'
    'import/no-absolute-path': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
