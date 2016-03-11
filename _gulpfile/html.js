// Dependencies
import config from './config';

import gulp from 'gulp';
import jade from 'gulp-jade';
import rename from 'gulp-rename';
// import gulpSitemap from 'gulp-sitemap';


export function dev() {
    return gulp.src([
        config.paths.source.base + '/**/*.jade',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
        .pipe(jade({
            pretty: true,
        }))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}

export function prod() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    let htmlmin = require('gulp-htmlmin');
    let replace = require('gulp-replace');

    return gulp.src([
        config.paths.source.base + '/**/*.jade',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
        .pipe(jade())
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
        .pipe(gulp.dest(config.paths.build.base));
}

export function lint() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    let puglint = require('gulp-pug-lint');

    return gulp.src(config.paths.source.base + '/**/*.jade')
        .pipe(puglint());
}

export function sitemap() {
    return gulp.src([ // You can define files here which should be included or excluded in the sitemap.xml
        config.paths.build.base + '/**/*.html',
    ])
        // .pipe(rename({
        //     extname: '', // Remove the file extension
        // }))
        // .pipe(gulpSitemap({
        //     siteUrl: config.live.url, // Make sure to set your domain in the config.js
        //     changefreq: 'monthly',
        // }))
        .pipe(gulp.dest(config.paths.build.base));
}
