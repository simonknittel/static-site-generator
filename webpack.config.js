const path = require('path')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  entry: {
    global: './src/assets/scripts/global.bundle.ts',
    front: './src/assets/scripts/front.bundle.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js'),
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
