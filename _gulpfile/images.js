exports.icons = function icons() {
  const config = require('./config').default
  const gulp = require('gulp')
  const svgSprite = require('gulp-svg-sprite')

  return gulp.src(config.paths.src.images + '/icons/**/*.svg')
    .pipe(svgSprite({ // Bundles all icons into one SVG stack
      mode: {
        stack: {
          dest: '',
          sprite: 'icons',
        },
      },
    }))
    .pipe(gulp.dest(config.paths.dist.images))
}

exports.normal = function normal() {
  const config = require('./config').default
  const gulp = require('gulp')
  const cached = require('gulp-cached')
  const imagemin = require('gulp-imagemin')

  return gulp.src([
    config.paths.src.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
    '!' + config.paths.src.images + '/icons/**/*', // Icons are handled by the task above
  ])
    .pipe(cached('images:default')) // Pass through only files changed after the last run
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.dist.images))
}
