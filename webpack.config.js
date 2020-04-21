const path = require('path')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  entry: {
    global: './src/assets/scripts/global.bundle.js',
    front: './src/assets/scripts/front.bundle.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js'),
    publicPath: '/assets/js/',
  },
  resolve: {
    extensions: [ '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
  node: false,
}
