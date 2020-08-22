const path = require('path')
const { utils, constants } = require('crext')

// TODO:
// const CopyPlugin = require('copy-webpack-plugin')
// const replaceInBuffer = require('buffer-replace')

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

const entries = [ENTRIES.BACKGROUND_ENTRY, ENTRIES.NEWTAB_ENTRY]
const srcDir = (dir = '.') => path.join(__dirname, '/src', dir)

const alias = {
  // popupAppStyles: 'path-to/popupAppStyles'
}

// WARNING! Every process.env variable should be defined here
const envVars = {
  NODE_ENV: 'development',
  API_KEY: '',
  BUILD_NUMBER: '0',
  // SAMPLE_ENV_VARIABLE: 'DEFAULT_VALUE'
}

module.exports = ({ args }) => ({
  version: '1.0.0',
  webpack: {
    entries,
    alias,
    envVars,

    extend(originalConfig) {
      return overridePlugin(originalConfig, args)
    },

    extendManifest(originalManifest) {
      const manifest = { ...originalManifest }

      if (args.browser === 'firefox') {
        manifest.applications = {
          gecko: {
            id: '93aa706f8e92e8aacc0074d811b8838c4bd46cb2xc86@tmp',
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

const overridePlugin = (config, args) => {
  //   const copyPlugin = new CopyPlugin([
  //     { from: 'src/manifest.json' },
  //     { from: 'src/assets/icons', to: 'assets/icons' },
  //     {
  //       from: 'src/vendor',
  //       to: 'vendor',
  //       transform: (contents) => {
  //         if (args.browser === 'firefox') {
  //           return replaceInBuffer(contents, 'chrome-extension', 'moz-extension')
  //         }

  //         return contents
  //       },
  //     },
  //   ])

  //   config.plugins = utils.replacePlugin(
  //     config.plugins,
  //     (pluginName) => pluginName === 'CopyPlugin',
  //     copyPlugin
  //   )

  return config
}
