const path = require('path')


const babelOptions = {
  cacheDirectory: true,
  presets: [
    [
      'env',
      {
        targets: {
          browsers: [
            'last 3 Chrome versions',
            'last 3 ChromeAndroid versions',
            'last 3 Samsung versions',
            'last 3 Firefox versions',
            'last 2 Edge versions',
            'last 2 Safari versions',
            'last 2 iOS versions',
          ],
        },
        modules: false,
      },
    ],
  ],
}


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
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
    ],
  },
  node: false,
}
