const os = require('os')
const fs = require('fs-extra')

const overrideJsonSync = (filePath, data) => {
  const json = require(filePath)
  const payload = Object.assign({}, json, data)
  fs.writeFileSync(filePath, JSON.stringify(payload, null, '  ') + os.EOL)
}

const replacePlugin = (plugins, nameMatcher, newPlugin) => {
  const pluginIndex = plugins.findIndex((plugin) => {
    return (
      plugin.constructor &&
      plugin.constructor.name &&
      nameMatcher(plugin.constructor.name)
    )
  })

  if (pluginIndex === -1) {
    return plugins
  }

  const nextPlugins = plugins
    .slice(0, pluginIndex)
    .concat(newPlugin)
    .concat(plugins.slice(pluginIndex + 1))

  return nextPlugins
}

module.exports = {
  overrideJsonSync,
  replacePlugin,
}
