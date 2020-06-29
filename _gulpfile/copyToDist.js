exports.copyToDist = function copyToDist() {
  const config = require('./config').default
  const gulp = require('gulp')
  const cached = require('gulp-cached')

  return gulp.src(config.paths.src.copyToDist + '/**/*')
    .pipe(cached('copy:copyToDist')) // Pass through only files changed after the last run
    .pipe(gulp.dest(config.paths.dist.copyToDist))
}
