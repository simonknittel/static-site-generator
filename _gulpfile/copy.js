// Dependencies
import config from './config';

import gulp from 'gulp';
import cached from 'gulp-cached';
// import replace from 'gulp-replace';


export function base() {
    return gulp.src([
        config.paths.source.base + '/robots.txt',
        config.paths.source.base + '/sitemap.xml',
        config.paths.source.base + '/.htaccess',
        config.paths.source.base + '/humans.txt',
    ])
        .pipe(cached('copy:base'))
        .pipe(gulp.dest(config.paths.build.base));
}

// export function cacheManifest() {
//     return gulp.src(config.paths.source.base + '/cache.appcache')
//         .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
//         .pipe(gulp.dest(config.paths.build.base));
// }

export function libraries() {
    return gulp.src(config.paths.source.base + '/assets/libraries/**/*')
        .pipe(cached('copy:libraries'))
        .pipe(gulp.dest(config.paths.build.base + '/assets/libs'));
}
