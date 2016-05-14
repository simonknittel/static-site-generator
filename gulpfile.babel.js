// Dependencies
import config from './_gulpfile/config';

import gulp from 'gulp';


// Clean
gulp.task('clean', callback => {
    let del = require('del');

    del(config.paths.build.base).then(() => callback());
});


// Fixing
import * as scripts from './_gulpfile/scripts';
gulp.task('fix:scripts', scripts.fix);
gulp.task('fix', gulp.parallel('fix:scripts'));


// Scripts
gulp.task('scripts:prod', gulp.series('fix:scripts', scripts.prod));
gulp.task('scripts:dev', gulp.series('fix:scripts', scripts.dev));


// Styles
import * as styles from './_gulpfile/styles';
gulp.task('styles:prod', styles.prod);
gulp.task('styles:dev', styles.dev);
gulp.task('styles:critical', styles.criticalCSS);


// HTML
import * as html from './_gulpfile/html';
gulp.task('html:prod', html.prod);
gulp.task('html:dev', html.dev);
gulp.task('html:sitemap', html.sitemap);


// Linting
gulp.task('lint:scripts', gulp.series('fix:scripts', scripts.lint));
gulp.task('lint:styles', styles.lint);
gulp.task('lint:html', html.lint);
gulp.task('lint', gulp.parallel('lint:scripts', 'lint:styles', 'lint:html'));


// Images
import * as images from './_gulpfile/images';
gulp.task('images:default', images.normal);
gulp.task('images:icons', images.icons);
gulp.task('images', gulp.parallel('images:default', 'images:icons'));


// Copy
import * as copy from './_gulpfile/copy';
gulp.task('copy:base', copy.base);
gulp.task('copy:libraries', copy.libraries);
gulp.task('copy', gulp.parallel('copy:base', 'copy:libraries'));


// Default
gulp.task('default', gulp.series('clean', gulp.parallel('images', 'scripts:dev', gulp.series(gulp.parallel('styles:dev', 'html:dev'), 'html:sitemap'), 'copy')));

// Production
gulp.task('production', gulp.series('clean', gulp.parallel('images', 'scripts:prod', gulp.series(gulp.parallel('styles:prod', 'html:prod'), gulp.parallel('styles:critical', 'html:sitemap')), 'copy')));


// Deploy
gulp.task('deploy', gulp.series('production', () => {
    let notify = require('gulp-notify');
    let sftp = require('gulp-sftp');

    let sftpSettings = config.deployment.develop;
    switch (process.argv.slice(3)[0]) {
        case '--target=production':
            sftpSettings = config.deployment.live;
            break;
        case '--target=test':
            sftpSettings = config.deployment.test;
            break;
    }

    return gulp.src(config.paths.build.base + '/**/*')
        .pipe(sftp(sftpSettings))
        .pipe(notify({
            title: 'deploy finished',
            message: ' ',
            sound: true,
            onLast: true,
        }));
}));


// Watch
gulp.task('watch', gulp.series('default', () => {
    let browserSync = require('browser-sync');
    let modRewrite = require('connect-modrewrite');
    let compression = require('compression');

    gulp.watch(config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}', gulp.series('images', browserSync.reload));

    gulp.watch(config.paths.source.scripts + '/**/*.js', gulp.series('scripts:dev', browserSync.reload));

    gulp.watch(config.paths.source.styles + '/**/*.scss', gulp.series('styles:dev'));

    gulp.watch([
        config.paths.source.base + '/**/*.pug',
    ], gulp.series('html:dev', 'html:sitemap', browserSync.reload));

    gulp.watch([
        config.paths.source.base + '/robots.txt',
        config.paths.source.base + '/.htaccess',
        config.paths.source.base + '/humans.txt',
    ], gulp.series('copy:base', browserSync.reload));

    gulp.watch(config.paths.source.base + '/assets/libraries/**/*', gulp.series('copy:libraries', browserSync.reload));

    browserSync({
        server: {
            baseDir: config.paths.build.base,
            middleware: [
                modRewrite([
                    '^.([^\\.]+)$ /$1.html [L]', // Remove .html from URL (as in the .htaccess)
                ]),
                compression(), // Enable gzip compression
            ],
        },
    });
}));
