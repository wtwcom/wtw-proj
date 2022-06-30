const path = require('path');
const {merge} = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3100,
    hot: true,
    static: './dist',
    proxy: {
      '/api': {
        target: 'http://10.50.82.37:8088',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
})