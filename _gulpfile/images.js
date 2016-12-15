// Dependencies
import config from './config';

import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import cached from 'gulp-cached';
import tinypng from 'gulp-tinypng';
import gulpIf from 'gulp-if';


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

export function normalDev() {
    return gulp.src([
        config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
        '!' + config.paths.source.images + '/icons/**/*', // Icons are handled by the task above
    ])
        .pipe(cached('images:default')) // Pass through only files changed after the last run
        .pipe(gulp.dest(config.paths.build.images));
}

function isTinyPNGAPIKeySet() {
    return (config.tinyPNG ? true : false);
}

export function normalProd() {
    return gulp.src([
        config.paths.source.images + '/**/*.{jpg,jpeg,ico,png,gif,svg}',
        '!' + config.paths.source.images + '/icons/**/*', // Icons are handled by the task above
    ])
        .pipe(cached('images:default')) // Pass through only files changed after the last run
        .pipe(gulpIf(isTinyPNGAPIKeySet(), tinypng.bind(undefined, {apiKey: config.tinyPNG}))) // BUG: ???
        .pipe(gulp.dest(config.paths.build.images));
}
