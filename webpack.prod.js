const path = require('path')


module.exports = {
  mode: 'production',
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
  node: false,
}
