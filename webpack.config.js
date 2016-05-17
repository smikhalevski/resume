var path = require('path'),
    webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: [
      './src/main/index.js',
      './src/main/index.less'
    ]
  },
  output: {
    path: './target/out',
    filename: '[name].js'
  },
  //externals: [
  //  {
  //    'react': true,
  //    'react-dom': true
  //  }
  //],
  resolve: {
    root: [
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main/index.html',
      minify: {collapseWhitespace: true}
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.json$/, loader: 'hson'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?strictUnits=true&strictMath=true')},
      {test: /\.(png|jpg)$/, loader: 'file-loader?name=[name].[ext]'}
    ]
  }
};
