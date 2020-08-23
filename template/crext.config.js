const path = require('path')
const { utils, constants } = require('crext')

// Entries
const ENTRIES = {
  POPUP_ENTRY: {
    path: './src/popup/popup.js',
    name: 'popup',
    htmlEntry: './src/popup/popup.html',
  },
  OPTIONS_ENTRY: {
    path: './src/options/options.js',
    name: 'options',
    htmlEntry: './src/options/options.html',
  },
  BACKGROUND_ENTRY: {
    path: './src/background/background.js',
    name: 'background',
  },
  NEWTAB_ENTRY: {
    path: './src/newtab/newtab.js',
    name: 'newtab',
    htmlEntry: './src/newtab/newtab.html',
  },
}

module.exports = ({ args }) => ({
  // Version of current configuration
  version: '1.0.0',

  // Webpack configuration
  webpack: {
    entries: [ENTRIES.BACKGROUND_ENTRY, ENTRIES.NEWTAB_ENTRY],

    // Aliases
    alias: {
      // Example:
      // newtabStyles: './src/newtab/styles'
    },

    // Environment variables
    // WARNING! Every process.env variable should be defined here
    envVars: {
      NODE_ENV: 'development',
      API_KEY: '',
      BUILD_NUMBER: 0,
    },

    // Extend default configurations
    extend(originalConfig) {
      return overridePlugin(originalConfig, args)
    },

    // Extend default manifest
    extendManifest(originalManifest) {
      const manifest = { ...originalManifest }

      if (args.browser === 'firefox') {
        manifest.applications = {
          gecko: {
            id: 'aa93706f8e92e8aacc0074d811b8838c4bd46cb286xc@tmp',
            strict_min_version: '57.0',
          },
        }
      }

      if (args.stage === 'prod') {
        manifest.content_scripts = [
          {
            matches: ['<all_urls>'],
            css: ['css/content-script.css'],
          },
        ]
      }

      return manifest
    },
  },
})

const overridePlugin = (config) => {
  // Example:
  // const CopyPlugin = require('copy-webpack-plugin')
  // const replaceInBuffer = require('buffer-replace')
  // const copyPlugin = new CopyPlugin([
  //  ...sample plugin configuration...
  //  ])
  // config.plugins = utils.replacePlugin(
  //   config.plugins,
  //   (pluginName) => pluginName === 'CopyPlugin',
  //   copyPlugin
  // )

  return config
}
