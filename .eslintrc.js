module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "camelcase": 1,
    "no-unused-vars": 1
  }
}
