import gulp from 'gulp'


// Clean
gulp.task('clean', callback => {
  const config = require('./_gulpfile/config').default
  require('del')(config.paths.dist.base).then(() => callback())
})


// Scripts
import { prod as scriptsProd, dev as scriptsDev } from './_gulpfile/scripts'
gulp.task('scripts:prod', scriptsProd)
gulp.task('scripts:dev', scriptsDev)


// Styles
import { prod as stylesProd, dev as stylesDev, criticalCSS as stylesCritical } from './_gulpfile/styles'
gulp.task('styles:prod', stylesProd)
gulp.task('styles:dev', stylesDev)
gulp.task('styles:critical', stylesCritical)


// HTML
import { prod as htmlProd, dev as htmlDev, sitemap as htmlSitemap } from './_gulpfile/html'
gulp.task('html:prod', htmlProd)
gulp.task('html:dev', htmlDev)
gulp.task('html:sitemap', htmlSitemap)


// Linting
import { lint as lintStyles } from './_gulpfile/styles'
import { lint as lintHTML } from './_gulpfile/html'
gulp.task('lint:styles', lintStyles)
gulp.task('lint:html', lintHTML)
gulp.task('lint', gulp.parallel('lint:styles', 'lint:html'))


// Images
import { normal as imagesNormal, icons as imagesIcons } from './_gulpfile/images'
gulp.task('images:default', imagesNormal)
gulp.task('images:icons', imagesIcons)
gulp.task('images', gulp.parallel('images:default', 'images:icons'))


// Copy
import { base as copyBase, libraries as copyLibraries, fonts as copyFonts} from './_gulpfile/copy'
gulp.task('copy:base', copyBase)
gulp.task('copy:libraries', copyLibraries)
gulp.task('copy:fonts', copyFonts)
gulp.task('copy', gulp.parallel('copy:base', 'copy:libraries', 'copy:fonts'))


// Default
gulp.task('default', gulp.series('clean', gulp.parallel('images', 'scripts:dev', gulp.series(gulp.parallel('styles:dev', 'html:dev'), 'html:sitemap'), 'copy')))

// Production
gulp.task('production', gulp.series('clean', gulp.parallel('images', 'scripts:prod', gulp.series(gulp.parallel('styles:prod', 'html:prod'), gulp.parallel('styles:critical', 'html:sitemap')), 'copy')))


// Watch
gulp.task('watch', gulp.series('default', () => {
  const config = require('./_gulpfile/config').default
  const browserSync = require('browser-sync')
  const modRewrite = require('connect-modrewrite')
  const compression = require('compression')

  gulp.watch(config.paths.src.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}', gulp.series('images', done => { // https://github.com/BrowserSync/browser-sync/issues/1065#issuecomment-215516517
    browserSync.reload()
    done()
  }))

  gulp.watch(config.paths.src.scripts + '/**/*.ts', gulp.series('scripts:dev', done => {
    browserSync.reload()
    done()
  }))

  gulp.watch(config.paths.src.styles + '/**/*.scss', gulp.series('styles:dev'))

  gulp.watch([
    config.paths.src.base + '/**/*.pug',
    config.paths.src.data + '/**/*.cson',
  ], gulp.series('html:dev', 'html:sitemap', done => {
    browserSync.reload()
    done()
  }))

  gulp.watch([
    config.paths.src.base + '/robots.txt',
    config.paths.src.base + '/.htaccess',
    config.paths.src.base + '/humans.txt',
  ], gulp.series('copy:base', done => {
    browserSync.reload()
    done()
  }))

  gulp.watch(config.paths.src.base + '/assets/libraries/**/*', gulp.series('copy:libraries', done => {
    browserSync.reload()
    done()
  }))

  gulp.watch(config.paths.src.fonts + '/**/*', gulp.series('copy:fonts', done => {
    browserSync.reload()
    done()
  }))

  // Mirror this part to valimate.js
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
}))
