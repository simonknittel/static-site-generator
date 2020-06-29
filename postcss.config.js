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
        '(min-width: 20rem)': '320',
        '(min-width: 40rem)': '640',
        '(min-width: 60rem)': '960',
        '(min-width: 80rem)': '1280',
      },
    },
    '@hail2u/css-mqpacker': {
      sort: true,
    },
    cssnano: {
      preset: 'default',
    },
  },
}
