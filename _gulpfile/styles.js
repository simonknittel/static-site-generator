// Dependencies
import config from './config';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import scssLint from 'gulp-scss-lint';
import moreCSS from 'gulp-more-css';


export function dev() {
    return gulp.src(config.paths.source.styles + '/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [
                    './node_modules',
                ],
            }))
            .on('error', notify.onError({
                title: 'styles - failed',
                message: 'View console for more details.',
                sound: true,
            }))
            .on('error', err => console.error('ERROR TASK: styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber))
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.build.styles));
}

export function prod() {
    return gulp.src(config.paths.source.styles + '/*.scss')
        .pipe(sass({
            includePaths: [
                './node_modules',
            ],
        }))
        .on('error', notify.onError({
            title: 'prod-styles - failed',
            message: 'View console for more details.',
            sound: true,
        }))
        .on('error', err => console.error('ERROR TASK: prod-styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber))
        .pipe(autoprefixer())
        .pipe(moreCSS())
        .pipe(gulp.dest(config.paths.build.styles));
}

export function lint() {
    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(scssLint());
}
