const babelConfig = require('./babel.config.json')
const path = require('path')

module.exports = {
  mode: 'production',

  entry: {
    global: './src/assets/scripts/global.js',
    front: './src/assets/scripts/front.js',
  },

  output: {
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

        // See https://stackoverflow.com/questions/57361439/how-to-exclude-core-js-using-usebuiltins-usage/59647913#59647913
        // and https://github.com/babel/babel-loader#exclude-libraries-that-should-not-be-transpiled
        exclude: [
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/
        ],

        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            ...babelConfig
          }
        }
      }
    ],
  },

  node: false,
}
