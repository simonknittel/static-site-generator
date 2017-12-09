// Dependencies
import config from './config'

import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import imagemin from 'gulp-imagemin'
import cached from 'gulp-cached'


export function icons() {
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

export function normal() {
  return gulp.src([
    config.paths.src.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
    '!' + config.paths.src.images + '/icons/**/*', // Icons are handled by the task above
  ])
    .pipe(cached('images:default')) // Pass through only files changed after the last run
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.dist.images))
}
