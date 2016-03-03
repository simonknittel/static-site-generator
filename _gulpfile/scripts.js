// Dependencies
import config from './config';

import gulp from 'gulp';
import jspm from 'gulp-jspm';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';


function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

export function dev() {
    return gulp.src([
        config.paths.source.scripts + '/**/*.js',
        '!' + config.paths.source.scripts + '/_modules/**/*',
    ])
        .pipe(sourcemaps.init())
            .pipe(jspm({
                selfExecutingBundle: true,
            }))
            .pipe(rename(path => {
                path.basename = path.basename.replace('.bundle', '');
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.build.scripts));
}

export function prod() {
    return gulp.src([
        config.paths.source.scripts + '/**/*.js',
        '!' + config.paths.source.scripts + '/_modules/**/*',
    ])
        .pipe(jspm({
            selfExecutingBundle: true,
        }))
        .pipe(rename(path => {
            path.basename = path.basename.replace('.bundle', '');
        }))
        .pipe(gulp.dest(config.paths.build.scripts));
}

// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
export function fix() {
    let eslint = require('gulp-eslint');
    let gulpIf = require('gulp-if');

    return gulp.src(config.paths.source.scripts + '/**/*.js')
        .pipe(eslint({
            fix: true, // Fix lint errors
        }))
        .pipe(gulpIf(isFixed, gulp.dest(config.paths.source.scripts)));
}

export function lint() {
    let eslint = require('gulp-eslint');

    return gulp.src(config.paths.source.scripts + '/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
}
