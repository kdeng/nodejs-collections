module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html',
    'jest',
  ],
  'env': {
    'jest/globals': true
  },
  'rules': {
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'comma-dangle': ['error', {
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
    }]
  }
}
