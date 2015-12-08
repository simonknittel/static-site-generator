// Dependencies
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import csso from 'gulp-csso';
import gulp from 'gulp';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import scssLint from 'gulp-scss-lint';


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

source.styles = source.base + '/assets/styles';
build.styles = build.base + '/assets/css';


export function dev() {
    return gulp.src(source.styles + '/*.scss')
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
        .pipe(gulp.dest(build.styles))
        .pipe(browserSync.reload({stream: true}));
}

export function prod() {
    return gulp.src(source.styles + '/*.scss')
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
        .pipe(gulp.dest(build.styles));
}

export function lint() {
    return gulp.src(source.styles + '/**/*.scss')
        .pipe(scssLint());
}
