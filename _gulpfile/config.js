let config = {
  // s3: {
  //     dev: false,
  //     prod: false,
  // },
  paths: {
    src: {
      base: 'src',
    },
    dist: {
      base: 'dist',
    },
  },
  production: {
    url: 'https://localhost:3000', // For automated sitemap generation
  },
}

config.paths.src.styles = config.paths.src.base + '/assets/styles'
config.paths.src.scripts = config.paths.src.base + '/assets/scripts'
config.paths.src.images = config.paths.src.base + '/assets/images'
config.paths.src.fonts = config.paths.src.base + '/assets/fonts'
config.paths.src.data = config.paths.src.base + '/_data'

config.paths.dist.styles = config.paths.dist.base + '/assets/css'
config.paths.dist.scripts = config.paths.dist.base + '/assets/js'
config.paths.dist.images = config.paths.dist.base + '/assets/img'
config.paths.dist.fonts = config.paths.dist.base + '/assets/fonts'

export default config
