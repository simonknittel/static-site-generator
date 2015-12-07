// Dependencies
import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import minifyHTML from 'gulp-minify-html';
import rename from 'gulp-rename';
import replace from 'gulp-replace';


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';


export function dev() {
    const templateData = {};

    return gulp.src([
        source.base + '/**/*.hbs',
        source.base + '/**/*.handlebars',
        '!' + source.base + '/_partials/**/*',
        '!' + source.base + '/assets/**/*',
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
        .pipe(gulp.dest(build.base));
}

export function prod() {
    const templateData = {};

    return gulp.src([
        source.base + '/**/*.hbs',
        source.base + '/**/*.handlebars',
        '!' + source.base + '/_partials/**/*',
        '!' + source.base + '/assets/**/*',
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
        .pipe(gulp.dest(build.base));
}
