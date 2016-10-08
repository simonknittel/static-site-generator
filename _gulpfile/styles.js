// Dependencies
import config from './config';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';


export function dev() {
    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [ // Enable import from libraries installed with npm
                    './node_modules',
                ],
            }))
            .on('error', notify.onError({
                title: 'styles:dev - failed',
                message: 'View console for more details.',
                sound: true,
            }))
            .on('error', err => console.error('ERROR TASK: styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber))
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.build.styles))
        .pipe(browserSync.stream({match: '**/*.css'}));
}

export function prod() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const moreCSS = require('gulp-more-css');

    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(sass({
            includePaths: [ // Enable import from libraries installed with npm
                './node_modules',
            ],
        }))
        .pipe(autoprefixer())
        .pipe(moreCSS({
            radical: false,
        }))
        .pipe(gulp.dest(config.paths.build.styles));
}

export function lint() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const scssLint = require('gulp-scss-lint');

    return gulp.src(config.paths.source.styles + '/**/*.scss')
        .pipe(scssLint());
}

export function criticalCSS(callback) {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const critical = require('critical');

    critical.generate({
        inline: true, // Will be inserted into the <head>
        base: config.paths.build.base,
        src: '/index.html',
        dest: config.paths.build.base + '/index.html',
        minify: true,
        width: 1280, // Viewbox
        height: 800, // Viewbox
    }, () => {
        callback();
    });
}
