'use strict';
const resolve = require('path').resolve;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const cfg = {
    splitChunks: {
      chunks: "all"
    }
  };
  if (!isDev) {
    cfg.minimizer = [
      new OptimizeCssPlugin(),
      new TerserPlugin()
    ];
  }
  return cfg;
};

module.exports = {
  context: resolve(__dirname, 'src'),
  mode: 'development',
  devServer: {
    port: 4201,
    hot: isDev
  },
  entry: {
    main: './main.js'
  },
  optimization: optimization(),
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {hmr: isDev, reloadAll: true}
          },
          'css-loader',
          'sass-loader'
        ]
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
