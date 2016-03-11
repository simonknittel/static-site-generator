let config = {
    // s3: {
    //     dev: false,
    //     prod: false,
    // },
    paths: {
        source: {
            base: 'source',
        },
        build: {
            base: 'build',
        },
    },
    live: {
        url: '', // For automated sitemap generation
    },
};

config.paths.source.styles = config.paths.source.base + '/assets/styles';
config.paths.source.scripts = config.paths.source.base + '/assets/scripts';
config.paths.source.images = config.paths.source.base + '/assets/images';

config.paths.build.styles = config.paths.build.base + '/assets/css';
config.paths.build.scripts = config.paths.build.base + '/assets/js';
config.paths.build.images = config.paths.build.base + '/assets/img';

export default config;
