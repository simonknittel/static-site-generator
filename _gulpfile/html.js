// Dependencies
import config from './config';

import gulp from 'gulp';
import jade from 'gulp-jade';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import puglint from 'gulp-pug-lint';
import gulpSitemap from 'gulp-sitemap';


export function dev() {
    return gulp.src([
        config.paths.source.base + '/**/*.jade',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
        .pipe(jade({
            pretty: true,
        }))
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}

export function prod() {
    return gulp.src([
        config.paths.source.base + '/**/*.jade',
        '!' + config.paths.source.base + '/_partials/**/*',
    ])
        .pipe(jade())
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(htmlmin({
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
    return gulp.src(config.paths.source.base + '/**/*.jade')
        .pipe(puglint());
}

export function sitemap() {
    return gulp.src(config.paths.build.base + '/**/*.html')
        .pipe(gulpSitemap({
            siteUrl: config.live.url,
            changefreq: 'monthly',
        }))
        .pipe(gulp.dest(config.paths.build.base));
}
