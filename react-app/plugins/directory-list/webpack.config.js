// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './index.js',
  },
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, '../../public/plugins/directory-list'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
    //new MiniCssExtractPlugin({ filename: 'style.css' }),
    /*
    new webpack.ProvidePlugin({
      ENV: "development",
    }),
    */
  ]
}
