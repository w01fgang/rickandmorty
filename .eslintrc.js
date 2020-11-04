module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'react',
    'jsx-a11y',
    'cypress',
  ],
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
  env: {
    node: true,
    jest: true,
    jasmine: true,
    browser: true,
    es6: true,
    'cypress/globals': true,
  },
  rules: {
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
