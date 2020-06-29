const gulp = require('gulp')


// Clean
gulp.task('clean', callback => {
  const config = require('./_gulpfile/config').default
  require('del')(config.paths.dist.base).then(() => callback())
})


// Scripts
const {prod: scriptsProd, dev: scriptsDev } = require('./_gulpfile/scripts')
gulp.task('scripts:prod', scriptsProd)
gulp.task('scripts:dev', scriptsDev)


// Styles
const {prod: stylesProd, dev: stylesDev, criticalCSS: stylesCritical } = require('./_gulpfile/styles')
gulp.task('styles:prod', stylesProd)
gulp.task('styles:dev', stylesDev)
gulp.task('styles:critical', stylesCritical)


// HTML
const {prod: htmlProd, dev: htmlDev, sitemap: htmlSitemap } = require('./_gulpfile/html')
gulp.task('html:prod', htmlProd)
gulp.task('html:dev', htmlDev)
gulp.task('html:sitemap', htmlSitemap)


// Linting
const {lint: lintStyles } = require('./_gulpfile/styles')
const {lint: lintHTML } = require('./_gulpfile/html')
gulp.task('lint:styles', lintStyles)
gulp.task('lint:html', lintHTML)
gulp.task('lint', gulp.parallel('lint:styles', 'lint:html'))


// Images
const {normal: imagesNormal, icons: imagesIcons } = require('./_gulpfile/images')
gulp.task('images:default', imagesNormal)
gulp.task('images:icons', imagesIcons)
gulp.task('images', gulp.parallel('images:default', 'images:icons'))


// Copy to dist
const { copyToDist } = require('./_gulpfile/copyToDist')
gulp.task('copyToDist', copyToDist)


// Default
gulp.task('default', gulp.series('clean', gulp.parallel('images', 'scripts:dev', gulp.series(gulp.parallel('styles:dev', 'html:dev'), 'html:sitemap'), 'copyToDist')))

// Production
gulp.task('production', gulp.series('clean', gulp.parallel('images', 'scripts:prod', gulp.series(gulp.parallel('styles:prod', 'html:prod'), gulp.parallel('styles:critical', 'html:sitemap')), 'copyToDist')))


// Watch
const { watch } = require('./_gulpfile/watch')
gulp.task('watch', gulp.series('default', watch))
