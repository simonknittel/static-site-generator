const path = require('path')
const config = require('./_gulpfile/config').default

module.exports = {
  plugins: {
    autoprefixer: true,
    'postcss-extract-media-query': {
      output: {
        path: path.join(config.paths.dist.styles),
      },
      queries: {
        '(min-width: 40rem)': '40',
        '(min-width: 60rem)': '60',
        '(min-width: 80rem)': '80',
      },
      extractAll: false,
    },
    '@hail2u/css-mqpacker': {
      sort: true,
    },
    cssnano: {
      preset: 'default',
    },
  },
}
