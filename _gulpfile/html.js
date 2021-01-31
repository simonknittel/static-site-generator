function returnDataObject(file) {
  const config = require('./config').default
  const fs = require('fs')
  const yaml = require('js-yaml')

  const slash = process.platform === 'win32' ? '\\' : '/'
  const source = config.paths.src.base + '/' + file.path.replace(process.cwd() + slash + config.paths.src.base.replace('/', slash) + slash, '').replace('.pug', '.yml')

  return yaml.load(fs.readFileSync(source, 'utf8'))
}


exports.dev = function dev() {
  const config = require('./config').default
  const gulp = require('gulp')
  const data = require('gulp-data')
  const notifier = require('node-notifier')
  const plumber = require('gulp-plumber')
  const pug = require('gulp-pug')
  const rename = require('gulp-rename')

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


exports.prod = function prod() {
  const config = require('./config').default
  const gulp = require('gulp')
  const data = require('gulp-data')
  const htmlmin = require('gulp-htmlmin')
  const pug = require('gulp-pug')
  const rename = require('gulp-rename')
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


exports.lint = function lint() {
  const config = require('./config').default
  const gulp = require('gulp')
  const puglint = require('gulp-pug-linter')

  return gulp.src(config.paths.src.base + '/**/*.pug')
    .pipe(puglint())
}


exports.sitemap = function sitemap() {
  const config = require('./config').default
  const gulp = require('gulp')
  const gulpSitemap = require('gulp-sitemap')

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
