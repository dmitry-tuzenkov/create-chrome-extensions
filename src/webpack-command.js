const path = require('path')
const webpack = require('webpack')
const debug = require('debug')('crext:webpack')
const webpackDev = require('./webpack.dev')
const webpackProd = require('./webpack.prod')
const { COMMAND } = require('./constants')

module.exports = ({ command, stage, browser }) => {
  const cwd = process.cwd()
  const args = { command, stage, browser }

  debug('command is', command)
  debug('stage is', stage)
  debug('browser is', browser)
  debug('cwd is', cwd)

  const webpackHandler = command === COMMAND.BUILD ? webpackProd : webpackDev
  const configsFn = require(path.resolve(cwd, './crext.config.js'))
  // TODO: Validate with JOI entrypoints or configs
  const configs = configsFn({ args })
  const overriders = ['extend', 'extendManifest']
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

  return webpack(webpackHandler(configs), (err, stats) => {
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
}
