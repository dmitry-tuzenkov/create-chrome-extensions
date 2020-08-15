const path = require('path')
const webpack = require('webpack')
const debug = require('debug')('extension-scripts:build')
const webpackProd = require('../webpack.prod')

debug('process argv is', process.argv)

let args = {}
const cwd = process.cwd()
try {
  args = JSON.parse(process.argv[3])
} catch (e) {
  console.error('Failed to parse 3rd arg', e)
}

debug('args is', args)
debug('cwd is', cwd)

const configsFn = require(path.resolve(cwd, './crext.config.js'))
const configs = configsFn({ args })
const overriders = ['extendDev', 'extendProd', 'extendManifest']
configs.args = args

overriders.forEach((key) => {
  if (!configs.webpack[key]) {
    configs.webpack[key] = (cfg) => {
      console.log(`No configuration for override for ${key}`)
      return cfg
    }
  }
})

debug('Webpack Configs is', JSON.stringify(configs))

webpack(webpackProd(configs), (err, stats) => {
  // Stats Object
  if (err) {
    // Handle errors here
    console.log('Webpack Error', err)
  }

  console.log(
    stats.toString({
      colors: true,
    })
  )

  // Done processing
})
