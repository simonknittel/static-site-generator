// Dependencies
import config from './config';

import gulp from 'gulp';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import gulpSitemap from 'gulp-sitemap';


export function dev() {
    return gulp.src([
        config.paths.source.base + '/**/*.pug',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
        .pipe(pug({
            pretty: true,
        }))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}

export function prod() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const htmlmin = require('gulp-htmlmin');
    const replace = require('gulp-replace');

    return gulp.src([
        config.paths.source.base + '/**/*.pug',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
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
        .pipe(gulp.dest(config.paths.build.base));
}

export function lint() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const puglint = require('gulp-pug-lint');

    return gulp.src(config.paths.source.base + '/**/*.pug')
        .pipe(puglint());
}

export function sitemap() {
    return gulp.src([ // You can define files here which should be included or excluded in the sitemap.xml
        config.paths.build.base + '/**/*.html',
    ])
        .pipe(gulpSitemap({
            siteUrl: config.live.url, // Make sure to set your domain in the config.js
            changefreq: 'monthly',
            mappings: [
                {
                    pages: ['**/*.html'],
                    getLoc: function(siteUrl, loc) {
                        return loc.substr(0, loc.lastIndexOf('.')) || loc; // Removes the file extension
                    },
                },
            ],
        }))
        .pipe(gulp.dest(config.paths.build.base));
}
