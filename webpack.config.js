'use strict';
const resolve = require('path').resolve;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),
  mode: 'development',
  devServer: {
    port: 4201
  },
  entry: {
    main: './main.js'
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.json\.data$/,
        use: ['file-loader']
      }
    ]
  }
};
