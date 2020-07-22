const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  // {
  //   test: /\.(m?js|node)$/,
  //   parser: { amd: false },
  //   use: {
  //     loader: '@marshallofsound/webpack-asset-relocator-loader',
  //     options: {
  //       outputAssetBase: 'native_modules',
  //     },
  //   },
  // },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test')]
  },
  {
    test: /\.jsx$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test')]
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ]
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
  },
  {
    test: /\.(tsx|js|jsx)$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  },
];
