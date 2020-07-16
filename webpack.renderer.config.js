const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
};
