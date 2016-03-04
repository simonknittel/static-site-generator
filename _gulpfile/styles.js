// Dependencies
import config from './config';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import filter from 'gulp-filter';


export function dev() {
    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [ // Enable import from libraries installed with npm
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
        .pipe(gulp.dest(config.paths.build.styles))
        .pipe(filter('**/*.css')) // Filter the sourcemaps so that BrowserSync will properly inject the CSS without reloading the pafe
        .pipe(browserSync.stream());
}

export function prod() {
    let moreCSS = require('gulp-more-css');

    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(sass({
            includePaths: [ // Enable import from libraries installed with npm
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
        .pipe(moreCSS({
            radical: false,
        }))
        .pipe(gulp.dest(config.paths.build.styles));
}

export function lint() {
    let scssLint = require('gulp-scss-lint');

    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(scssLint());
}

export function criticalCSS(callback) {
    let critical = require('critical');

    critical.generate({
        inline: true,
        base: config.paths.build.base,
        src: '/index.html',
        dest: config.paths.build.base + '/index.html',
        minify: true,
        width: 1280,
        height: 800,
    }, () => {
        callback();
    });
}
