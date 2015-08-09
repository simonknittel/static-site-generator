// Dependencies
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var csso = require('gulp-csso');
// var del = require('del');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var imagemin = require('gulp-imagemin');
var jspm = require('jspm');
// var kraken = require('gulp-kraken'); // Needs API access
var minifyHTML = require('gulp-minify-html');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var sftp = require('gulp-sftp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
// var webp = require('gulp-webp');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_images = source_base + '/assets/images';
var build_images = build_base + '/assets/img';

var source_scripts = source_base + '/assets/scripts';
var build_scripts = build_base + '/assets/js';

var source_styles = source_base + '/assets/styles';
var build_styles = build_base + '/assets/css';


// Configuration
jspm.setPackagePath('.');


// Clean
// gulp.task('clean', function() {
//     del(build_base);
// });


// Scripts
gulp.task('scripts', function(callback) {
    jspm.bundleSFX(source_scripts + '/main', build_scripts + '/scripts.js', {
    // jspm.bundleSFX(source_scripts + '/main', build_scripts + '/scripts.js', {
        minify: false,
        sourceMaps: true,
        mangle: true,
        lowResSourceMaps: true
    }).then(function() {
        return callback();
    });
});


// Scripts - Production
gulp.task('prod-scripts', function(callback) {
    jspm.bundleSFX(source_scripts + '/main', build_scripts + '/scripts.js', {
        minify: true,
        sourceMaps: false,
        mangle: true,
        lowResSourceMaps: true
    }).then(function() {
        return callback();
    });
});


// Styles
gulp.task('styles', function() {
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
});


// Styles - Production
gulp.task('prod-styles', function() {
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
});


// HTML
gulp.task('html', function() {
    var templateData = {};

    return gulp.src([
        source_base + '/*.hbs',
        source_base + '/*.handlebars',
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
});


// HTML - Production
gulp.task('prod-html', function() {
    var templateData = {};

    return gulp.src([
        source_base + '/*.hbs',
        source_base + '/*.handlebars',
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
});


// Images
gulp.task('images', ['imagesDefault']);

gulp.task('imagesDefault', function () {
    return gulp.src([
        source_images + '/**/*.jpg',
        source_images + '/**/*.ico', // Not supported - getting passed through
        source_images + '/**/*.jpeg',
        source_images + '/**/*.png',
        source_images + '/**/*.gif',
        source_images + '/**/*.svg',
    ])
        .pipe(changed(build_images))
        .pipe(imagemin())
        // .pipe(kraken({
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(build_images));
});

// gulp.task('imagesWebP', function () {
//     return gulp.src([
//         source_images + '/**/*.jpg',
//         source_images + '/**/*.jpeg',
//         source_images + '/**/*.png',
//     ])
//         .pipe(changed(build_images))
//         .pipe(webp({
//             lossless: true,
//         }))
//         .pipe(gulp.dest(build_images));
// });


// Copy
gulp.task('copy', ['copy:base', 'copy:cache-manifest', 'copy:libraries'], function() {});

gulp.task('copy:base', function() {
    return gulp.src([
        source_base + '/robots.txt',
        source_base + '/sitemap.xml',
        source_base + '/.htaccess',
        source_base + '/humans.txt',
    ])
        .pipe(changed(build_base))
        .pipe(gulp.dest(build_base));
});

gulp.task('copy:cache-manifest', function() {
    return gulp.src(source_base + '/cache.appcache')
        .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
        .pipe(gulp.dest(build_base));
});

gulp.task('copy:libraries', function() {
    return gulp.src(source_base + '/assets/libraries/**/*')
        .pipe(changed(build_base + '/assets/libs'))
        .pipe(gulp.dest(build_base + '/assets/libs'));
});


// Default
gulp.task('default', ['images', 'scripts', 'styles', 'html', 'copy']);

// Production
gulp.task('production', ['images', 'prod-scripts', 'prod-styles', 'prod-html', 'copy']);


// Deploy
gulp.task('deploy', ['production'], function() {
    return gulp.src(build_base + '/**/*')
        .pipe(sftp({
            host: 'ssh.strato.de',
            remotePath: '/',
        }))
        .pipe(notify({
            title: 'deploy finished',
            message: ' ',
            sound: true,
            onLast: true,
        }));
});


// Watch
gulp.task('watch', ['default'], function() {
    gulp.watch([
        source_images + '/**/*.jpg',
        source_images + '/**/*.ico',
        source_images + '/**/*.jpeg',
        source_images + '/**/*.png',
        source_images + '/**/*.gif',
        source_images + '/**/*.svg',
    ], ['images', browserSync.reload]);

    gulp.watch(source_scripts + '/**/*', ['scripts', 'html', 'copy:cache-manifest', browserSync.reload]);

    gulp.watch(source_styles + '/**/*', ['styles', 'html', 'copy:cache-manifest']);

    gulp.watch([
        source_base + '/**/*.hbs',
        source_base + '/**/*.handlebars',
    ], ['html', 'copy:cache-manifest', browserSync.reload]);

    gulp.watch([
        source_base + '/robots.txt',
        source_base + '/sitemap.xml',
        source_base + '/.htaccess',
        source_base + '/humans.txt',
        source_base + '/cache.appcache',
    ], ['copy', browserSync.reload]);

    browserSync({
        server: {
            baseDir: build_base,
        },
    });
});
