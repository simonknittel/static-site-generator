// Dependencies
import browserSync from 'browser-sync';
// import del from 'del';
import gulp from 'gulp';
import notify from 'gulp-notify';
import sftp from 'gulp-sftp';


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

source.images = source.base + '/assets/images';
build.images = build.base + '/assets/img';

source.scripts = source.base + '/assets/scripts';
build.scripts = build.base + '/assets/js';

source.styles = source.base + '/assets/styles';
build.styles = build.base + '/assets/css';


// Clean
// gulp.task('clean', function() {
//     del(build.base);
// });


// Fixing
gulp.task('fix:scripts', scripts.fix);
gulp.task('fix', gulp.parallel('fix:scripts'));


// Scripts
import * as scripts from './gulpfile/_scripts';
gulp.task('scripts:prod', gulp.series('fix:scripts', scripts.prod));
gulp.task('scripts:dev', gulp.series('fix:scripts', scripts.dev));


// Styles
import * as styles from './gulpfile/_styles';
gulp.task('styles:prod', styles.prod);
gulp.task('styles:dev', styles.dev);


// Linting
gulp.task('lint:scripts', gulp.series('fix:scripts', scripts.lint));
gulp.task('lint:styles', styles.lint);
gulp.task('lint', gulp.parallel('lint:scripts', 'lint:styles'));


// HTML
import * as html from './gulpfile/_html';
gulp.task('html:prod', html.prod);
gulp.task('html:dev', html.dev);


// Images
import * as images from './gulpfile/_images';
gulp.task('images:default', images.normal);
// gulp.task('images:webP', images.webP);
gulp.task('images', gulp.parallel('images:default'));


// Copy
import * as copy from './gulpfile/_copy';
gulp.task('copy:base', copy.base);
// gulp.task('copy:cache-manifest', copy.cacheManifest);
gulp.task('copy:libraries', copy.libraries);
gulp.task('copy', gulp.parallel('copy:base'/**, 'copy:cache-manifest'*/, 'copy:libraries'));


// Default
gulp.task('default', gulp.parallel('images', 'scripts:dev', 'styles:dev', 'html:dev', 'copy'));

// Production
gulp.task('production', gulp.parallel('images', 'scripts:prod', 'styles:prod', 'html:prod', 'copy'));


// // Deploy
gulp.task('deploy', gulp.series('production', function() {
    return gulp.src(build.base + '/**/*')
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
    gulp.watch(source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}', gulp.series('images', browserSync.reload));

    gulp.watch(source.scripts + '/**/*.js', gulp.series(gulp.parallel('scripts:dev', 'html:dev'/**, 'copy:cache-manifest'*/), browserSync.reload));

    gulp.watch(source.styles + '/**/*.scss', gulp.series(gulp.parallel('styles:dev', 'html:dev'/**, 'copy:cache-manifest'*/), browserSync.reload));

    gulp.watch([
        source.base + '/**/*.hbs',
        source.base + '/**/*.handlebars',
        '!' + source.base + '/assets/**/*',
    ], gulp.series('html:dev'/**, 'copy:cache-manifest'*/, browserSync.reload));

    gulp.watch([
        source.base + '/robots.txt',
        source.base + '/sitemap.xml',
        source.base + '/.htaccess',
        source.base + '/humans.txt',
    ], gulp.series('copy:base', browserSync.reload));

    // gulp.watch(source.base + '/cache.appcache', gulp.series('copy:cache-manifest', browserSync.reload));

    gulp.watch(source.base + '/assets/libraries/**/*', gulp.series('copy:libraries', browserSync.reload));

    browserSync({
        server: {
            baseDir: build.base,
        },
    });
}));
