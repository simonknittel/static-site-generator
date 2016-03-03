// Dependencies
import config from './config';

import gulp from 'gulp';


export function icons() {
    let svgSprite = require('svgSprite');

    return gulp.src(config.paths.source.images + '/icons/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    dest: '',
                    sprite: 'icons',
                },
            },
        }))
        .pipe(gulp.dest(config.paths.build.images));
}

export function normal() {
    let imagemin = require('gulp-imagemin');
    let cached = require('gulp-cached');
    let kraken = require('gulp-kraken'); // Needs API access

    return gulp.src([
        config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
        '!' + config.paths.source.images + '/icons/**/*',
    ])
        .pipe(cached('images:default')) // Pass through only files changed after the last run
        .pipe(imagemin())
        // .pipe(kraken({ // PRO account needed
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(config.paths.build.images));
}
