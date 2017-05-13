// Dependencies
import config from './config';

import gulp from 'gulp';
import jspm from 'gulp-jspm';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notifier from 'node-notifier';


function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

export function dev() {
    return gulp.src([
        config.paths.source.scripts + '/**/*.js',
        '!' + config.paths.source.scripts + '/_modules/**/*',
    ])
        .pipe(plumber(error => {
            notifier.notify({
                title: 'scripts:dev - failed',
                message: 'View console for more details.',
                sound: true,
            });
            console.error(error);
        }))
        .pipe(sourcemaps.init())
            .pipe(jspm({selfExecutingBundle: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.build.scripts));
}

export function prod() {
    return gulp.src([
        config.paths.source.scripts + '/**/*.js',
        '!' + config.paths.source.scripts + '/_modules/**/*',
    ])
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(gulp.dest(config.paths.build.scripts));
}

// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
export function fix() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const eslint = require('gulp-eslint');
    const gulpIf = require('gulp-if');

    return gulp.src(config.paths.source.scripts + '/**/*.js')
        .pipe(eslint({fix: true}))
        .pipe(gulpIf(isFixed, gulp.dest(config.paths.source.scripts)));
}

export function lint() {
    // Modules loaded here, because they are only needed for this task and it will only run once (performance improvement)
    const eslint = require('gulp-eslint');

    return gulp.src(config.paths.source.scripts + '/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
}
