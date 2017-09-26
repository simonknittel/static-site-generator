// Dependencies
import config from './config'

import gulp from 'gulp'
import notifier from 'node-notifier'
import webpack from 'webpack'

import devConfig from '../webpack.config'


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
    if (stats.hasErrors()) console.error(statsFormatted.errors)
    if (stats.hasWarnings()) console.warn(statsFormatted.warnings)

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
  // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
  const config = require('../webpack.prod')

  webpackBase(config, done)
}
