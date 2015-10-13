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
gulp.task('scripts', scripts.dev);
gulp.task('scripts-prod', scripts.prod);


// Styles
import * as styles from './gulpfile/_styles';
gulp.task('styles', styles.dev);
gulp.task('styles-prod', styles.prod);


// HTML
import * as html from './gulpfile/_html';
gulp.task('html', html.dev);
gulp.task('html-prod', html.prod);


// Images
import * as images from './gulpfile/_images';
gulp.task('images', ['images:default']);
gulp.task('images:default', images.normal);
// gulp.task('images:webP', images.webP);


// Copy
import * as copy from './gulpfile/_copy';
gulp.task('copy', ['copy:base', 'copy:cache-manifest', 'copy:libraries'], function() {});
gulp.task('copy:base', copy.base);
gulp.task('copy:cache-manifest', copy.cacheManifest);
gulp.task('copy:libraries', copy.libraries);


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
        '!' + source_base + '/_partials/**/*',
        '!' + source_base + '/assets/**/*',
    ], ['html', 'copy:cache-manifest', browserSync.reload]);

    gulp.watch([
        source_base + '/robots.txt',
        source_base + '/sitemap.xml',
        source_base + '/.htaccess',
        source_base + '/humans.txt',
        source_base + '/cache.appcache',
    ], ['copy:base', browserSync.reload]);

    gulp.watch([
        source_base + '/assets/libraries/**/*',
    ], ['copy:libraries', browserSync.reload]);

    browserSync({
        server: {
            baseDir: build_base,
        },
    });
});
