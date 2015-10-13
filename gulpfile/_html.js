// Dependencies
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var minifyHTML = require('gulp-minify-html');
var rename = require('gulp-rename');
var replace = require('gulp-replace');


// Variables
var source_base = 'source';
var build_base = 'build';


export function dev() {
    var templateData = {};

    return gulp.src([
        source_base + '/**/*.hbs',
        source_base + '/**/*.handlebars',
        '!' + source_base + '/_partials/**/*',
        '!' + source_base + '/assets/**/*',
    ])
        .pipe(handlebars(templateData, {
            batch : ['./source'],
            helpers: {
                compare: function(a, b) {
                    if (a === b) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
        }))
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(build_base));
}

export function prod() {
    var templateData = {};

    return gulp.src([
        source_base + '/**/*.hbs',
        source_base + '/**/*.handlebars',
        '!' + source_base + '/_partials/**/*',
        '!' + source_base + '/assets/**/*',
    ])
        .pipe(handlebars(templateData, {
            batch : ['./source'],
            helpers: {
                compare: function(a, b) {
                    if (a === b) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
        }))
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(minifyHTML({}))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(build_base));
}
