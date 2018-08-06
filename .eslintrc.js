module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'comma-dangle': 0,
    'no-shadow': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-else-return': 0,
    'no-unused-expressions': 0,
    'max-len': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': ['error', { 'args': 'after-used' }],
    'no-confusing-arrow': ['error', { 'allowParens': true }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}