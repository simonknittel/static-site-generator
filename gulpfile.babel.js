// Dependencies
import config from './_gulpfile/config';

import browserSync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import notify from 'gulp-notify';
import sftp from 'gulp-sftp';
import cached from 'gulp-cached';

import modRewrite from 'connect-modrewrite';
import compression from 'compression';


// Clean
gulp.task('clean', callback => {
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
gulp.task('default', gulp.series('clean', gulp.parallel('images', 'scripts:dev', 'styles:dev', gulp.series('html:dev', 'html:sitemap'), 'copy')));

// Production
gulp.task('production', gulp.series('clean', gulp.parallel('images', 'scripts:prod', 'styles:prod', gulp.series('html:prod', 'html:sitemap'), 'copy')));


// Deploy
gulp.task('deploy', gulp.series('production', () => {
    return gulp.src(config.paths.build.base + '/**/*')
        .pipe(cached('deploy'))
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
gulp.task('watch', gulp.series('default', () => {
    gulp.watch(config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}', gulp.series('images', browserSync.reload));

    gulp.watch(config.paths.source.scripts + '/**/*.js', gulp.series(gulp.parallel('scripts:dev', 'html:dev'), 'html:sitemap', browserSync.reload));

    gulp.watch(config.paths.source.styles + '/**/*.scss', gulp.series(gulp.parallel('styles:dev', 'html:dev'), 'html:sitemap', browserSync.reload));

    gulp.watch([
        config.paths.source.base + '/**/*.jade',
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
                    // '^([^\.]+)$ $1.html [NC,L]', // Original from the .htaccess
                    '^.([^\\.]+)$ /$1.html [L]',
                ]),
                compression(),
            ],
        },
    });
}));
