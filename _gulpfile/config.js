let config = {};

config.s3 = {
    dev: false,
    prod: false,
};

config.paths = {
    source: {},
    build: {},
};

config.paths.source.base = 'source';
config.paths.source.styles = config.paths.source.base + '/assets/styles';
config.paths.source.scripts = config.paths.source.base + '/assets/scripts';
config.paths.source.images = config.paths.source.base + '/assets/images';

config.paths.build.base = 'build';
config.paths.build.styles = config.paths.build.base + '/assets/css';
config.paths.build.scripts = config.paths.build.base + '/assets/js';
config.paths.build.images = config.paths.build.base + '/assets/img';

config.live = {};

config.live.url = 'test'; // For automated sitemap generation

export default config;
