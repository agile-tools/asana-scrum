const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    index: ['./src/index/index']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
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
    }]
  }
};
