module.exports = function(config) {
    config.set({
        autoWatch: false,
        browsers: [
            'PhantomJS',
        ],
        frameworks: [
            'jspm',
            'jasmine',
        ],
        jspm: {
            loadFiles: [
                'jspm_packages/system-polyfills.js',
                'source/assets/scripts/**/*.spec.js',
            ],
            serveFiles: [
                'source/assets/scripts/**/!(*.spec).js',
            ],
        },
        phantomjsLauncher: {
            exitOnResourceError: true,
        },
        plugins: [
            'karma-jasmine',
            'karma-jspm',
            'karma-phantomjs-launcher',
        ],
        preprocessors: {},
        singleRun: true,
    });
};
