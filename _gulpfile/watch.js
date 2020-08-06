const gulp = require('gulp')


exports.watch = function watch() {
  const config = require('./config').default
  const browserSync = require('browser-sync')

  gulp.watch(`${config.paths.src.images }/**/*.{jpg,jpeg,ico,png,gif,svg}`, gulp.series('images', done => { // https://github.com/BrowserSync/browser-sync/issues/1065#issuecomment-215516517
    browserSync.reload()
    done()
  }))

  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)
  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(stats.toString({ colors: true }))
    browserSync.reload()
  })

  gulp.watch(`${config.paths.src.styles }/**/*.scss`, gulp.series('styles:dev'))

  gulp.watch([
    `${config.paths.src.base }/**/*.pug`,
    `${config.paths.src.base }/**/*.yml`,
  ], gulp.series('html:dev', 'html:sitemap', done => {
    browserSync.reload()
    done()
  }))

  gulp.watch(`${config.paths.src.copyToDist }/**/*`, gulp.series('copyToDist', done => {
    browserSync.reload()
    done()
  }))

  const modRewrite = require('connect-modrewrite')
  const compression = require('compression')
  browserSync({
    ghostMode: {
      clicks: false,
      scroll: false,
      forms: false,
    },
    server: {
      baseDir: config.paths.dist.base,
      middleware: [
        modRewrite([
          '^.([^\\.]+)$ /$1.html [L]', // Remove .html from URL (as in the .htaccess)
        ]),
        compression(), // Enable gzip compression
      ],
    },
    https: true,
    online: false,
  })
}
