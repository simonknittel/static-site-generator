// Dependencies
import config from './config'

import data from 'gulp-data'
import fs from 'fs'
import gulp from 'gulp'
import gulpSitemap from 'gulp-sitemap'
import notifier from 'node-notifier'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import rename from 'gulp-rename'
import yaml from 'js-yaml'


function returnDataObject(file) {
  const slash = process.platform === 'win32' ? '\\' : '/'
  const source = config.paths.src.base + '/' + file.path.replace(process.cwd() + slash + config.paths.src.base.replace('/', slash) + slash, '').replace('.pug', '.yml')

  return yaml.safeLoad(fs.readFileSync(source, 'utf8'))
}


export function dev() {
  return gulp.src([
    config.paths.src.base + '/**/*.pug',
    '!' + config.paths.src.base + '/_templates/**/*',
  ])
    .pipe(plumber(error => {
      notifier.notify({
        title: 'html:dev - failed',
        message: 'View console for more details.',
        sound: true,
      })
      console.error(error)
    }))
    .pipe(data(returnDataObject))
    .pipe(pug({pretty: true}))
    .pipe(rename(path => path.extname = '.html'))
    .pipe(gulp.dest(config.paths.dist.base))
}

export function prod() {
  // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
  const htmlmin = require('gulp-htmlmin')
  const replace = require('gulp-replace')

  return gulp.src([
    config.paths.src.base + '/**/*.pug',
    '!' + config.paths.src.base + '/_templates/**/*',
  ])
    .pipe(data(returnDataObject))
    .pipe(pug())
    .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
    .pipe(htmlmin({ // Minify the html code
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      removeTagWhitespace: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
    }))
    .pipe(rename(path => path.extname = '.html'))
    .pipe(gulp.dest(config.paths.dist.base))
}

export function lint() {
  // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
  const puglint = require('gulp-pug-lint')

  return gulp.src(config.paths.src.base + '/**/*.pug')
    .pipe(puglint())
}

export function sitemap() {
  return gulp.src([ // You can define files here which should be included or excluded in the sitemap.xml
    config.paths.dist.base + '/**/*.html',
  ])
    .pipe(gulpSitemap({
      siteUrl: config.production.url, // Make sure to set your domain in the config.js
      changefreq: 'monthly',
      mappings: [
        {
          pages: [ '**/*.html' ],
          // Removes the file extension
          getLoc: (siteUrl, loc) => loc.substr(0, loc.lastIndexOf('.')) || loc
        },
      ],
    }))
    .pipe(gulp.dest(config.paths.dist.base))
}
