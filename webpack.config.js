const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: {
    global: './source/assets/scripts/global.bundle.ts',
    front: './source/assets/scripts/front.bundle.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build/assets/js'),
    publicPath: '/assets/js/',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
  node: false,
}
