// webpack.config.js
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    "plugins/sidebar/main": './sidebar/index.js',
    sdk: './sdk/index.js',
  },
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
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
    // make sure to include the plugin!
    //new MiniCssExtractPlugin({ filename: 'style.css' }),
    /*
    new webpack.ProvidePlugin({
      ENV: "development",
    }),
    */
  ]
}
