// Dependencies
import {execSync} from 'child_process';
import fs from 'fs';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';


// Variables
let source = {};
let build = {};

source.base = 'source';
build.base = 'build';

source.scripts = source.base + '/assets/scripts';
build.scripts = build.base + '/assets/js';

function bundle(parameters = '') {
    const files = fs.readdirSync(source.scripts);

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('.js', files[i].length - '.js'.length) !== -1) {
            var file = files[i].slice(0, -3);
            execSync('jspm bundle-sfx ' + source.scripts + '/' + file + ' ' + build.scripts + '/' + file + '.js ' + parameters);
        }
    }

    return;
}

export function dev(callback) {
    bundle();
    return callback();
}

export function prod(callback) {
    bundle('--minify --skip-source-maps');
    return callback();
}
