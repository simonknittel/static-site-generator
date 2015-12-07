// Dependencies
import changed from 'gulp-changed';
import gulp from 'gulp';
import replace from 'gulp-replace';

// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

export function base() {
    return gulp.src([
        source.base + '/robots.txt',
        source.base + '/sitemap.xml',
        source.base + '/.htaccess',
        source.base + '/humans.txt',
    ])
        .pipe(changed(build.base))
        .pipe(gulp.dest(build.base));
}

// export function cacheManifest() {
//     return gulp.src(source.base + '/cache.appcache')
//         .pipe(replace('RANDOMIZE-ME', new Date().getTime()))
//         .pipe(gulp.dest(build.base));
// }

export function libraries() {
    return gulp.src(source.base + '/assets/libraries/**/*')
        .pipe(changed(build.base + '/assets/libs'))
        .pipe(gulp.dest(build.base + '/assets/libs'));
}
