export function base() {
  const config = require('./config').default
  const gulp = require('gulp')
  const cached = require('gulp-cached')

  return gulp.src([
    config.paths.src.base + '/robots.txt',
    config.paths.src.base + '/.htaccess',
    config.paths.src.base + '/humans.txt',
  ])
    .pipe(cached('copy:base')) // Pass through only files changed after the last run
    .pipe(gulp.dest(config.paths.dist.base))
}


export function libraries() {
  const config = require('./config').default
  const gulp = require('gulp')
  const cached = require('gulp-cached')

  return gulp.src(config.paths.src.base + '/assets/libraries/**/*')
    .pipe(cached('copy:libraries')) // Pass through only files changed after the last run
    .pipe(gulp.dest(config.paths.dist.base + '/assets/libs'))
}


export function fonts() {
  const config = require('./config').default
  const gulp = require('gulp')
  const cached = require('gulp-cached')

  return gulp.src(config.paths.src.fonts + '/**/*')
    .pipe(cached('copy:fonts')) // Pass through only files changed after the last run
    .pipe(gulp.dest(config.paths.dist.fonts))
}
