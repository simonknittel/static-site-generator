// Dependencies
import {execSync} from 'child_process';
import fs from 'fs';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if'


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

source.scripts = source.base + '/assets/scripts';
build.scripts = build.base + '/assets/js';


function bundle(parameters = '') {
    const files = fs.readdirSync(source.scripts);

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('.js', files[i].length - '.js'.length) !== -1) {
            var file = files[i].slice(0, -3);
            execSync('jspm bundle-sfx ' + source.scripts + '/' + file + ' ' + build.scripts + '/' + file + '.js' + parameters);
        }
    }

    return;
}

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

export function dev(callback) {
    bundle();
    return callback();
}

export function prod(callback) {
    bundle(' --minify --skip-source-maps');
    return callback();
}

// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
export function fix() {
    return gulp.src(source.scripts + '/**/*.js')
        .pipe(eslint({
            fix: true,
        }))
        .pipe(gulpIf(isFixed, gulp.dest(source.scripts)));
}

export function lint() {
    return gulp.src(source.scripts + '/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
}
