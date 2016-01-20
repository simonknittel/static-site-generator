// Dependencies
import config from './config';

import gulp from 'gulp';
import jade from 'gulp-jade';
import minifyHTML from 'gulp-minify-html';
import rename from 'gulp-rename';
import replace from 'gulp-replace';


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
        .pipe(minifyHTML({}))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(config.paths.build.base));
}
