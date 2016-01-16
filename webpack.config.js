'use strict'

var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/modal.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'modal.min.js'
  },
  module: {
    loaders: [
      {
        test: /src\/.+.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
