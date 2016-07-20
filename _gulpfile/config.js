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
        url: 'https://example.com', // For automated sitemap generation
    },
    deployment: {
        live: {
            host: '',
            remotePath: '',
            user: '',
            pass: '',
        },
        test: {
            host: '',
            remotePath: '',
            user: '',
            pass: '',
        },
        develop: {
            host: '',
            remotePath: '',
            user: '',
            pass: '',
        },
    },
};

config.paths.source.styles = config.paths.source.base + '/assets/styles';
config.paths.source.scripts = config.paths.source.base + '/assets/scripts';
config.paths.source.images = config.paths.source.base + '/assets/images';
config.paths.source.data = config.paths.source.base + '/_data';

config.paths.build.styles = config.paths.build.base + '/assets/css';
config.paths.build.scripts = config.paths.build.base + '/assets/js';
config.paths.build.images = config.paths.build.base + '/assets/img';

export default config;
