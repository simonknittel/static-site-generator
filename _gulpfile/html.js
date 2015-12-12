// Dependencies
import config from './config';

import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import minifyHTML from 'gulp-minify-html';
import rename from 'gulp-rename';
import replace from 'gulp-replace';


export function dev() {
    const templateData = {};

    return gulp.src([
        config.paths.source.base + '/**/*.hbs',
        config.paths.source.base + '/**/*.handlebars',
        '!' + config.paths.source.base + '/_partials/**/*',
        '!' + config.paths.source.base + '/assets/**/*',
    ])
        .pipe(handlebars(templateData, {
            batch: ['./source/_partials'],
            helpers: {
                compare: (a, b) => a === b,
            },
        }))
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}

export function prod() {
    const templateData = {};

    return gulp.src([
        config.paths.source.base + '/**/*.hbs',
        config.paths.source.base + '/**/*.handlebars',
        '!' + config.paths.source.base + '/_partials/**/*',
        '!' + config.paths.source.base + '/assets/**/*',
    ])
        .pipe(handlebars(templateData, {
            batch: ['./source/_partials'],
            helpers: {
                compare: (a, b) => a === b,
            },
        }))
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(minifyHTML({}))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}
