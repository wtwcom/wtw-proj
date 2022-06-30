const path = require('path');
const { VueLoaderPlugin }  = require('vue-loader');
const  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(jpe?g|png|gif|bmp)$/i,
      type: 'asset',
      generator: {
        filename: './images/[name].[hash:8][ext]'
      }
    }, {
      test: /\.svg$/,
      type: 'asset/inline'
    }],
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}