const entries = [
  {
    path: './src/background/background.js',
    name: 'background',
  },
  // {
  //   path: 'newtab/newtab.js',
  //   name: 'newtab',
  //   htmlEntry: 'newtab/newtab.html'
  // }
]

const srcDir = (dir = '.') => path.join(__dirname, '/src', dir)

const alias = {
  // popupAppStyles: 'path-to/popupAppStyles'
}

// WARNING! Every process.env variable should be defined here
const envVars = {
  API_KEY: '',
  BUILD_NUMBER: '0',
  // SAMPLE_ENV_VARIABLE: 'DEFAULT_VALUE'
}

module.exports = ({ args }) => ({
  webpack: {
    entries,
    alias,
    envVars,

    extend(config) {
      return config
    },

    extendManifest(originalManifest) {
      const manifest = { ...originalManifest }

      if (args.browser === 'firefox') {
        manifest.applications = {
          gecko: {
            id: '1a706f8e92e8aacc0074d811b8838c4bd46cb2b8@tmp',
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
