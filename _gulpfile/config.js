const config = {
  paths: {
    src: { base: 'src' },
    dist: { base: 'dist' },
  },
  production: {
    url: 'https://localhost:3000', // For automated sitemap generation
  },
}

config.paths.src.styles = config.paths.src.base + '/assets/styles'
config.paths.src.images = config.paths.src.base + '/assets/images'
config.paths.src.copyToDist = config.paths.src.base + '/copyToDist'

config.paths.dist.styles = config.paths.dist.base + '/assets/css'
config.paths.dist.images = config.paths.dist.base + '/assets/img'
config.paths.dist.copyToDist = config.paths.dist.base

exports.default = config
