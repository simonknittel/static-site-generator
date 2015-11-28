// Dependencies
import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import minifyHTML from 'gulp-minify-html';
import rename from 'gulp-rename';
import replace from 'gulp-replace';


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
