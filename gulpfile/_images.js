// Dependencies
var changed = require('gulp-changed');
var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var kraken = require('gulp-kraken'); // Needs API access
// var webp = require('gulp-webp');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_images = source_base + '/assets/images';
var build_images = build_base + '/assets/img';


export function normal() {
    return gulp.src(source_images + '/**/*.{jpg,jpeg,ico,png,gif,svg}')
        .pipe(changed(build_images))
        // .pipe(imagemin()) // Somehow broken
        // .pipe(kraken({
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(build_images));
}

// export function webP() {
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
// }
