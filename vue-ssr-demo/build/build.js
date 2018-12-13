'use strict'

require('shelljs/global')

env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')

const baseDir = path.resolve(__dirname, '..')
const distDir = path.resolve(baseDir, 'dist')

rm('-rf', distDir)
mkdir('-p', distDir)

// cp(path.resolve(baseDir, 'src/index.html'), distDir)

const compiler = webpack(config)
compiler.apply(new ProgressPlugin((completionRatio, msg) => {
  const percentage = Math.floor(completionRatio * 100);
  console.log(`${percentage}%: ${msg}`)
}))
compiler.run((err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log('Build complete.\n')
})
