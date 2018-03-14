const path = require('path');

module.exports = {
  target: 'node',
  entry: ['./src/main/server.js'],
  output: {
    path: path.join(__dirname, 'target/out'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ]
  },
  node: {__dirname: false},
  plugins: [
  ]
};
