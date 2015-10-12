// Dependencies
var fs = require('fs');
var gulp = require('gulp');
var jspm = require('jspm');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


// Variables
var source_base = 'source';
var build_base = 'build';

var source_scripts = source_base + '/assets/scripts';
var build_scripts = build_base + '/assets/js';


// Configuration
jspm.setPackagePath('.');


export function dev(callback) {
    var scriptsDone = 0;
    var scripts = [];

    fs.readdir(source_scripts, function(error, files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf('.js', files[i].length - '.js'.length) !== -1) {
                scripts.push(files[i].slice(0, -3));
            }
        }

        for (var i = 0; i < scripts.length; i++) {
            jspm.bundleSFX(source_scripts + '/' + scripts[i], build_scripts + '/' + scripts[i] + '.js', {
                minify: false,
                sourceMaps: true,
                mangle: true,
                lowResSourceMaps: true
            }).then(function() {
                scriptsDone++;
                if (scriptsDone === scripts.length) {
                    return callback();
                }
            });
        }
    });
}

export function prod(callback) {
    var scriptsDone = 0;
    var scripts = [];

    fs.readdir(source_scripts, function(error, files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf('.js', files[i].length - '.js'.length) !== -1) {
                scripts.push(files[i].slice(0, -3));
            }
        }

        for (var i = 0; i < scripts.length; i++) {
            jspm.bundleSFX(source_scripts + '/' + scripts[i], build_scripts + '/' + scripts[i] + '.js', {
                minify: true,
                sourceMaps: false,
                mangle: true,
                lowResSourceMaps: true
            }).then(function() {
                scriptsDone++;
                if (scriptsDone === scripts.length) {
                    return callback();
                }
            });
        }
    });
}
