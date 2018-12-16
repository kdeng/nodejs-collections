const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const clientConfig = require(path.resolve(__dirname, '../webpack.config'))

// const serverConfig = require('./webpack.server.conf')
// const MFS = require('memory-fs')

module.exports = (app, opt) => {
  // clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })

  app.use(devMiddleware)
  clientCompiler.hooks.done.tap((tap) => {
    const fs = devMiddleware.fileSystem
    const filePath = path.join(clientConfig.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
      const index = fs.readFileSync(filePath, 'utf-8')
      opt.indexUpdated(index)
    }
  })
  app.use(webpackHotMiddleware(clientCompiler))

  // const serverCompiler = webpack(serverConfig)
  // const mfs = new MFS()
  // const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  // serverCompiler.outputFileSystem = mfs
  // serverCompiler.watch({}, (err, stats) => {
  //   if (err) throw err
  //   stats = stats.toJson()
  //   stats.errors.forEach(err => console.error(err))
  //   stats.warnings.forEach(err => console.warn(err))
  //   opt.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
  // })
}
