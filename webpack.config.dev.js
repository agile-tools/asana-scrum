const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: ['webpack-hot-middleware/client', './src/index/index']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
      },
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
