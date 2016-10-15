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
                'source/assets/scripts/**/*.spec.js',
            ],
            serveFiles: [
                'jspm_packages/system-polyfills.js',
                'source/assets/scripts/**/!(*.spec).js',
            ],
        },
        phantomjsLauncher: {
            exitOnResourceError: true,
        },
        preprocessors: {},
        singleRun: true,
    });
};
