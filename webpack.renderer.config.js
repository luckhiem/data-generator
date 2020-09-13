const rules = require('./webpack.rules');

module.exports = {
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
};
