exports.dev = function dev() {
  const config = require('./config').default
  const gulp = require('gulp')
  const autoprefixer = require('gulp-autoprefixer')
  const browserSync = require('browser-sync')
  const notify = require('gulp-notify')
  const sass = require('gulp-sass')
  const sourcemaps = require('gulp-sourcemaps')

  return gulp.src(config.paths.src.styles + '/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({
        // Enable import from libraries installed with npm
        includePaths: [ './node_modules' ],
      }))
      .on('error', notify.onError({
        title: 'styles:dev - failed',
        message: 'View console for more details.',
        sound: true,
      }))
      .on('error', err => console.error('ERROR TASK: styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.dist.styles))
    .pipe(browserSync.stream({ match: '**/*.css' }))
}

exports.prod = function prod() {
  const config = require('./config').default
  const gulp = require('gulp')
  const autoprefixer = require('gulp-autoprefixer')
  const cleanCSS = require('gulp-clean-css')
  const sass = require('gulp-sass')

  return gulp.src(config.paths.src.styles + '/**/*.scss')
    .pipe(sass({
      // Enable import from libraries installed with npm
      includePaths: [ './node_modules' ],
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.paths.dist.styles))
}

exports.lint = function lint() {
  const config = require('./config').default
  const gulp = require('gulp')
  const stylelint = require('gulp-stylelint')

  return gulp.src(config.paths.src.styles + '/**/*.scss')
    .pipe(stylelint())
}

exports.criticalCSS = function criticalCSS(callback) {
  const config = require('./config').default
  const critical = require('critical')

  critical.generate({
    inline: true, // Will be inserted into the <head>
    base: config.paths.dist.base,
    src: '/index.html',
    dest: config.paths.dist.base + '/index.html',
    minify: true,
    width: 1920, // Viewbox
    height: 1080, // Viewbox
  }, () => {
    callback()
  })
}
