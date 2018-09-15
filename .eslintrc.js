module.exports = {
  extends: 'airbnb',
  env: {
    'browser': true,
  },
  globals: {
    fetch: true,
  },
  parser: 'babel-eslint',
  rules: {
    'no-return-assign': 'off',
    'no-unneeded-ternary': ['warn', { defaultAssignment: true }],
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'object'] }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
  },
};
