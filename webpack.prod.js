const path = require('path')


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
  node: false,
}
