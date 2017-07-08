// Dependencies
import config from './config'

import gulp from 'gulp'
import notifier from 'node-notifier'
import webpack from 'webpack'

import devConfig from '../webpack.config'
import prodConfig from '../webpack.prod'


function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed
}

function webpackBase(config, done) {
  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      console.error(err)

      notifier.notify({
        title: 'scripts:dev - failed',
        message: 'View console for more details.',
        sound: true,
      })

      done()
    }

    const statsFormatted = stats.toString()

    if (stats.hasErrors()) {
      console.error(statsFormatted.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(statsFormatted.warnings)
    }

    console.log(stats.toString({
      chunks: false,
      colors: true,
    }))

    done()
  })
}

export function dev(done) {
  webpackBase(devConfig, done)
}

export function prod(done) {
  webpackBase(prodConfig, done)
}

// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
export function fix() {
  // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
  const eslint = require('gulp-eslint')
  const gulpIf = require('gulp-if')

  return gulp.src(config.paths.source.scripts + '/**/*.js')
    .pipe(eslint({fix: true}))
    .pipe(gulpIf(isFixed, gulp.dest(config.paths.source.scripts)))
}

export function lint() {
  // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
  const eslint = require('gulp-eslint')

  return gulp.src(config.paths.source.scripts + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
}
