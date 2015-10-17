// Dependencies
var browserSync = require('browser-sync');
// var del = require('del');
var gulp = require('gulp');
var notify = require('gulp-notify');
var sftp = require('gulp-sftp');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_images = source_base + '/assets/images';
var build_images = build_base + '/assets/img';

var source_scripts = source_base + '/assets/scripts';
var build_scripts = build_base + '/assets/js';

var source_styles = source_base + '/assets/styles';
var build_styles = build_base + '/assets/css';


// Clean
// gulp.task('clean', function() {
//     del(build_base);
// });


// Scripts
import * as scripts from './gulpfile/_scripts';
gulp.task('scripts-prod', scripts.prod);
gulp.task('scripts', scripts.dev);


// Styles
import * as styles from './gulpfile/_styles';
gulp.task('styles-prod', styles.prod);
gulp.task('styles', styles.dev);


// HTML
import * as html from './gulpfile/_html';
gulp.task('html-prod', html.prod);
gulp.task('html', html.dev);


// Images
import * as images from './gulpfile/_images';
gulp.task('images:default', images.normal);
// gulp.task('images:webP', images.webP);
gulp.task('images', gulp.parallel('images:default'));


// Copy
import * as copy from './gulpfile/_copy';
gulp.task('copy:base', copy.base);
gulp.task('copy:cache-manifest', copy.cacheManifest);
gulp.task('copy:libraries', copy.libraries);
gulp.task('copy', gulp.parallel('copy:base', 'copy:cache-manifest', 'copy:libraries'));


// Default
gulp.task('default', gulp.parallel('images', 'scripts', 'styles', 'html', 'copy'));

// Production
gulp.task('production', gulp.parallel('images', 'scripts-prod', 'styles-prod', 'html-prod', 'copy'));


// // Deploy
gulp.task('deploy', gulp.series('production', function() {
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
}));


// Watch
gulp.task('watch', gulp.series('default', function() {
    gulp.watch([
        source_images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
    ], gulp.series('images', browserSync.reload));

    gulp.watch(source_scripts + '/**/*', gulp.series('scripts', 'html', 'copy:cache-manifest', browserSync.reload));

    gulp.watch(source_styles + '/**/*', gulp.series(gulp.parallel('styles', 'html', 'copy:cache-manifest'), browserSync.reload));

    gulp.watch([
        source_base + '/**/*.hbs',
        source_base + '/**/*.handlebars',
        '!' + source_base + '/_partials/**/*',
        '!' + source_base + '/assets/**/*',
    ], gulp.series('html', 'copy:cache-manifest', browserSync.reload));

    gulp.watch([
        source_base + '/robots.txt',
        source_base + '/sitemap.xml',
        source_base + '/.htaccess',
        source_base + '/humans.txt',
    ], gulp.series('copy:base', browserSync.reload));

    gulp.watch(source_base + '/cache.appcache', gulp.series('copy:cache-manifest', browserSync.reload));

    gulp.watch(source_base + '/assets/libraries/**/*', gulp.series('copy:libraries', browserSync.reload));

    browserSync({
        server: {
            baseDir: build_base,
        },
    });
}));
