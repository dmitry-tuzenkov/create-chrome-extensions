const path = require('path')
const { readFileSync } = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin')
const commonPaths = require('./paths')
const cwd = process.cwd()

const packageJson = require(path.join(cwd, './package.json'))
const manifestJson = require(path.join(cwd, './src/manifest.json'))

module.exports = (configs, args) => {
  const buildNumber = Number(process.env.BUILD_NUMBER) || 0
  const VERSION = `${packageJson.version}.${buildNumber}`
  const STAGE = args.stage
  const E2E = null

  const manifestKey = () =>
    readFileSync(path.join(cwd, './manifest.key')).toString()

  const getOverridedManifestJson = (manifest = {}) => {
    manifest.version = VERSION

    if (STAGE !== 'prod') {
      manifest.name = `${manifest.name} __STAGE_${STAGE.toUpperCase()}__`
    }

    if (E2E) {
      manifest.key = manifestKey()
    }

    return manifest
  }

  const htmlEntries = configs.entries.filter((e) => e.htmlEntry)

  const entry = configs.entries.reduce((obj, e) => {
    obj[e.name] = e.path
    return obj
  }, {})

  return {
    entry,

    output: {
      path: commonPaths.outputPath,
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },

    resolve: {
      alias: configs.alias,
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            emitWarning: STAGE !== 'prod',
          },
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
        },
        {
          test: /\.(png|jpg|gif|svg|webp|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: commonPaths.imagesFolder,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50000,
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        ...configs.envVars,
        ...Object.keys(args).reduce((acc, key) => {
          acc[`__${key.toUpperCase()}__`] = args[key]
          return acc
        }, {}),
      }),

      new CopyPlugin({
        patterns: [
          { from: 'src/manifest.json' },
          { from: 'src/assets/icons', to: 'assets/icons' },
          { from: 'src/vendor', to: 'vendor' },
        ],
      }),

      ...htmlEntries.map(({ htmlEntry, name }) => {
        const { base } = path.parse(htmlEntry)

        return new HtmlWebpackPlugin({
          chunks: ['common', name],
          filename: base,
          template: `!!html-webpack-plugin/lib/loader.js!${htmlEntry}`,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          },
        })
      }),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),

      new WebpackExtensionManifestPlugin({
        config: {
          base: manifestJson,
          extend: configs.extendManifest(
            getOverridedManifestJson({
              name: manifestJson.name,
            })
          ),
        },
      }),
    ],
  }
}
