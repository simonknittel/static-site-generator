// Dependencies
import changed from 'gulp-changed';
import gulp from 'gulp';
// import imagemin from 'gulp-imagemin';
// import kraken from 'gulp-kraken'; // Needs API access
// import webp from 'gulp-webp';


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

source.images = source.base + '/assets/images';
build.images = build.base + '/assets/img';


export function normal() {
    return gulp.src(source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}')
        .pipe(changed(build.images))
        // .pipe(imagemin()) // Somehow broken
        // .pipe(kraken({
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(build.images));
}

// export function webP() {
//     return gulp.src([
//         source.images + '/**/*.jpg',
//         source.images + '/**/*.jpeg',
//         source.images + '/**/*.png',
//     ])
//         .pipe(changed(build.images))
//         .pipe(webp({
//             lossless: true,
//         }))
//         .pipe(gulp.dest(build.images));
// }
