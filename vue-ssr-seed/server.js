const express = require('express')
const path = require('path')
const config = require('./src/config')
const isProd = !config.get('webpackDevMode')
const devServer = require('./build/dev-server')

// const contextPath = '/'
// const assetsPath = path.join(contextPath, 'assets')
const fs = require('fs')
const compression = require('compression')
const lru = require('lru-cache')
const vueRenderer = require('vue-server-renderer')

const app = express()

const createRenderer = bundle => {
  // https://github.com/isaacs/node-lru-cache#options
  return vueRenderer.createBundleRenderer(bundle, {
    cache: lru({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const parseMeta = (head, context) => {
  const title = context.title || ''
  const description = context.description || ''
  const keywords = context.keywords || ''
  head = head.replace(/(<title>)(.*?)(<\/title>)/, `$1${title}$3`)
  head = head.replace(/(<meta name=description content=")(.*?)(">)/, `$1${description}$3`)
  head = head.replace(/(<meta name=keywords content=")(.*?)(">)/, `$1${keywords}$3`)
  return head
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

let indexHTML
let renderer

if (isProd) {
  renderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js'), 'utf-8'))
  indexHTML = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')
} else {
  devServer(app, {
    indexUpdated: index => {
      indexHTML = index
    },
    bundleUpdated: bundle => {
      renderer = createRenderer(bundle)
    }
  })
}

app.use(compression({
  threshold: 0
}))
// app.use(favicon('./public/favicon.ico'))
// app.use('/dist', serve('./dist'))
// app.use('/public', serve('./public'))
// app.use('/api', require('./server/api/index'))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('the renderer is not ready, just wait a minute')
  }

  res.setHeader('Content-Type', 'text-html')

  const context = {
    url: req.url
  }
  const renderStream = renderer.renderToStream(context)

  renderStream.once('data', () => {
    res.write(parseMeta(indexHTML.head, context))
  })

  renderStream.on('data', chunk => {
    res.write(chunk)
  })

  renderStream.on('end', () => {
    // if (context.initialState) {
    //   res.write(
    //     `<script>window.__INITIAL_STATE__=${
    //     serialize(context.initialState, { isJSON: true })
    //     }</script>`
    //   )
    // }

    res.end()
  })

  renderStream.on('error', err => {
    if (err && err.code == '404') {
      res.status(404).end('404, Page Not Found')
      return
    }
    res.status(500).end('500 Internal Error')
    console.log(err)
  })
})

const PORT = process.env.PORT || 9001
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, function () {
  console.log(`server started at ${HOST}:${PORT} `)
})
