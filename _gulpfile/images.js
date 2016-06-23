// Dependencies
import config from './config';

import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import cached from 'gulp-cached';
// import kraken from 'gulp-kraken'; // Needs API access


export function icons() {
    return gulp.src(config.paths.source.images + '/icons/**/*.svg')
        .pipe(svgSprite({ // Bundles all icons into one SVG stack
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
    return gulp.src([
        config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
        '!' + config.paths.source.images + '/icons/**/*', // Icons are handled by the task above
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
