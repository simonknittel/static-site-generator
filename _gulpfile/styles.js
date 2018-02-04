const autoprefixerOptions = {
  browsers: [
    'last 3 Chrome versions',
    'last 3 ChromeAndroid versions',
    'last 3 Samsung versions',
    'last 3 Firefox versions',
    'last 2 Edge versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
  ],
}

export function dev() {
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
      .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.dist.styles))
    .pipe(browserSync.stream({ match: '**/*.css' }))
}

export function prod() {
  const config = require('./config').default
  const gulp = require('gulp')
  const autoprefixer = require('gulp-autoprefixer')
  const moreCSS = require('gulp-more-css')
  const sass = require('gulp-sass')

  return gulp.src(config.paths.src.styles + '/**/*.scss')
    .pipe(sass({
      includePaths: [ // Enable import from libraries installed with npm
        './node_modules',
      ],
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(moreCSS({radical: false}))
    .pipe(gulp.dest(config.paths.dist.styles))
}

export function lint() {
  const config = require('./config').default
  const gulp = require('gulp')
  const scssLint = require('gulp-scss-lint')

  return gulp.src(config.paths.src.styles + '/**/*.scss')
    .pipe(scssLint())
}

export function criticalCSS(callback) {
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
