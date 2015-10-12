// Dependencies
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_styles = source_base + '/assets/styles';
var build_styles = build_base + '/assets/css';


export function dev() {
    return gulp.src(source_styles + '/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({}))
            .on('error', notify.onError({
                title: 'styles - failed',
                message: 'View console for more details.',
                sound: true,
            }))
            .on('error', function (err) {
                console.error('ERROR TASK: styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber);
            })
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build_styles))
        .pipe(browserSync.reload({stream: true}));
}

export function prod() {
    return gulp.src(source_styles + '/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .on('error', notify.onError({
            title: 'prod-styles - failed',
            message: 'View console for more details.',
            sound: true,
        }))
        .on('error', function (err) {
            console.error('ERROR TASK: prod-styles MESSAGE: ' + err.message + ' FILENAME: ' + err.fileName + ' LINENUMBER: ' + err.lineNumber);
        })
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest(build_styles));
}
