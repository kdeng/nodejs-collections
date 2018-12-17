const Vue = require('vue')
const server = require('express')()

const port = 9001

const resolve = file => path.resolve(__dirname, file)

const app = new Vue({
  data: {
    msg: "hello vue ssr"
  },
  template: `<div>{{ msg }}</div>`
})

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/layout/index.template.html', 'utf-8')
})


server.get('*', (req, res) => {

  // Pre-fetch the data for seo
  const context = {
    title: "default page title",
    meta: '<meta author="Kefeng">'
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      console.log('Error', err)
      return
    }
    res.end(html)
  })
})

server.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})
