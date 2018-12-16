const schema = require('./schema')
const convict = require('convict')
const fs = require('fs')

const configFiles = [
  // location used by practiv-run-k8s-vue-microfrontend deployment.yaml:
  '/etc/config/config.js',
]

module.exports = convict(schema)
  .loadFile(configFiles.filter(fs.existsSync))
  .validate({ allowed: 'strict' })
