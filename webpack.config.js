let path = require('path');
let webpack = require('webpack');

module.exports = {
  watch: true,
  entry: {
    'arm-ui': './src/js/arm-ui.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].min.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['@babel/preset-env']
              }
          }
      ]
  },
};