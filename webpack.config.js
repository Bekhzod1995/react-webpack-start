const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
require('@babel/polyfill');

module.exports = {
  entry: ['@babel/polyfill', './react/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader',
      //   ],
      // },
      {
        test: /\.(ttf)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './react/index.html',
    }),
    // new MomentLocalesPlugin({
    //   localesToKeep: ['en-us', 'ru', 'uz'],
    // }),
  ],
};
