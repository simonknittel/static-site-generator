const path = require('path')


module.exports = {
  mode: 'production',
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
  node: false,
}
