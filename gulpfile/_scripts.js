// Dependencies
var execSync = require('child_process').execSync;
var fs = require('fs');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_scripts = source_base + '/assets/scripts';
var build_scripts = build_base + '/assets/js';

function bundle(parameters) {
    if (!parameters) {
        var parameters = '';
    }

    var files = fs.readdirSync(source_scripts);

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('.js', files[i].length - '.js'.length) !== -1) {
            var file = files[i].slice(0, -3);
            execSync('jspm bundle-sfx ' + source_scripts + '/' + file + '.js ' + build_scripts + '/' + file + '.js ' + parameters);
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
