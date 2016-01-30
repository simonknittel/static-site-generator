// Dependencies
import config from './config';

import gulp from 'gulp';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
// import kraken from 'gulp-kraken'; // Needs API access
import svgSprite from 'gulp-svg-sprite'


export function icons() {
    return gulp.src(config.paths.source.images + '/icons/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: 'icons',
                },
            },
        }))
        pipe(gulp.dest(config.paths.build.images)); // Outputting nothing???
}

export function normal() {
    return gulp.src([
        config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
        '!' + config.paths.source.images + '/icons/**/*',
    ])
        .pipe(cached('images:default'))
        .pipe(imagemin())
        // .pipe(kraken({ // PRO account needed
        //     key: '',
        //     secret: '',
        //     lossy: true,
        //     webp: true,
        // }))
        .pipe(gulp.dest(config.paths.build.images));
}
