// Dependencies
import config from './config';

import gulp from 'gulp';
import jade from 'gulp-jade';
import rename from 'gulp-rename';


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
    let puglint = require('gulp-puglint');

    return gulp.src(config.paths.source.base + '/**/*.jade')
        .pipe(puglint());
}

export function sitemap() {
    // let gulpSitemap = require('gulp-sitemap');

    return gulp.src([
        config.paths.build.base + '/**/*.html'
    ])
        // .pipe(rename({
        //     extname: '',
        // }))
        // .pipe(gulpSitemap({
        //     siteUrl: config.live.url,
        //     changefreq: 'monthly',
        // }))
        .pipe(gulp.dest(config.paths.build.base));
}
