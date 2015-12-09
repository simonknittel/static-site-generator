// Dependencies
import config from './config';

import gulp from 'gulp';
import changed from 'gulp-changed';
// import imagemin from 'gulp-imagemin';
// import kraken from 'gulp-kraken'; // Needs API access
// import webp from 'gulp-webp';


export function normal() {
    return gulp.src(config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}')
        .pipe(changed(config.paths.build.images))
        // .pipe(imagemin()) // Somehow broken
        // .pipe(kraken({
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(config.paths.build.images));
}

// export function webP() {
//     return gulp.src([
//         config.paths.source.images + '/**/*.jpg',
//         config.paths.source.images + '/**/*.jpeg',
//         config.paths.source.images + '/**/*.png',
//     ])
//         .pipe(changed(config.paths.build.images))
//         .pipe(webp({
//             lossless: true,
//         }))
//         .pipe(gulp.dest(config.paths.build.images));
// }
