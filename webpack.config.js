let path = require('path');
let webpack = require('webpack');

module.exports = {
  watch: true,
  entry: {
    common: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'arm-ui.min.js'
  }
};