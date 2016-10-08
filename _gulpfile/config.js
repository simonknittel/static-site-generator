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
    production: {
        url: 'https://localhost:3000', // For automated sitemap generation
    },
    deployment: {
        production: {
            host: '',
            remotePath: '',
            user: '',
            pass: '',
        },
        staging: {
            host: '',
            remotePath: '',
            user: '',
            pass: '',
        },
        integration: {
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
config.paths.source.fonts = config.paths.source.base + '/assets/fonts';
config.paths.source.data = config.paths.source.base + '/_data';

config.paths.build.styles = config.paths.build.base + '/assets/css';
config.paths.build.scripts = config.paths.build.base + '/assets/js';
config.paths.build.images = config.paths.build.base + '/assets/img';
config.paths.build.fonts = config.paths.build.base + '/assets/fonts';

export default config;
