const path = require('path')


module.exports = {
  entry: {
    global: './source/assets/scripts/global.bundle.js',
    front: './source/assets/scripts/front.bundle.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build/assets/js'),
    publicPath: '/assets/js/',
  },
  resolve: {
    extensions: [ '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: [
                      'last 2 Chrome versions',
                      'last 2 ChromeAndroid versions',
                      'last 2 Samsung versions',
                      'last 2 Firefox versions',
                      'last 2 Edge versions',
                      'last 2 Safari versions',
                      'last 2 iOS versions',
                    ],
                  },
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  node: false,
}
