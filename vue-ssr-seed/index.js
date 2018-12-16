const express = require('express')
const path = require('path')
const config = require('./src/config')
const lru = require('lru-cache')

const port = 9001
const assetsPath = 'assets'

const vueRenderer = require('vue-server-renderer')

const createRenderer = bundle => {
  // https://github.com/isaacs/node-lru-cache#options
  return vueRenderer.createBundleRenderer(bundle, {
    cache: lru({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

class StaticAssetsConfig {
  get mountPath () {
    return assetsPath
  }
  get middleware () {
    return express.static(path.join(__dirname, assetsPath))
  }
  get hotMiddleware () {
    return (req, res, next) => next()
  }
}

class WebpackAssetsConfig {
  constructor () {
    console.log('Webpack Dev Middleware In Use')
    this.webpackConfig = require('./webpack.config.js')
    this.webpackCompiler = require('webpack')(this.webpackConfig)
  }
  get mountPath () {
    return '/'
  }
  get middleware () {
    return require('webpack-dev-middleware')(this.webpackCompiler, {
      publicPath: this.webpackConfig.output.publicPath
    })
  }
  get hotMiddleware () {
    return require('webpack-hot-middleware')(this.webpackCompiler, {
      path: '/__webpack_hmr'
    })
  }
}

const assetsConfig = config.get('webpackDevMode') ? new WebpackAssetsConfig() : new StaticAssetsConfig()

function version (req, res) {
  res.send(require('./version.json').version)
}

const renderContext = {
  config: config.getProperties(),
}

express()
  .get('/healthz', (req, res) => res.sendStatus(200))
  .get('/version', version)
  .get(path.join('version'), version)
  .use(assetsConfig.mountPath, assetsConfig.middleware)
  .use(assetsConfig.hotMiddleware)
  .get('*', (req, res, next) => {
    res.render('index', renderContext)
  })
  .listen(port, () => console.log(`Express server listening on port ${port}`))
