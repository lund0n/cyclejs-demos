/* eslint-disable strict, import/no-extraneous-dependencies */
'use strict';
const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  entry: './index.js',
  output: {
    filename: env.prod ? '[name].js' : '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    pathinfo: !env.prod,
  },
  context: resolve(__dirname, 'src'),
  devtool: env.prod ? 'source-map' : 'eval',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'b-value',
      template: './index.html',
    }),
  ],
});
