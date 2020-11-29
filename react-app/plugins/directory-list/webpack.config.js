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
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'file-loader',
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
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
