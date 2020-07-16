const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/electronjs/index.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json']
  },
};