const { merge } = require('webpack-merge')
const ChromeExtensionReloader = require('webpack-extension-reloader')

const commonConfig = require('./webpack.common.js')
const commonPaths = require('./paths')

module.exports = (config) => {
  const BROWSER = config.args.browser
  const STAGE = config.args.stage
  const outputPath = commonPaths.output[BROWSER][STAGE]
  const mainConfig = merge(commonConfig(config.webpack, config.args), {
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,

    output: {
      path: outputPath,
    },

    module: {
      rules: [
        {
          test: /^((?!\.local).)*\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                camelCase: true,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.local.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },

    plugins: [new ChromeExtensionReloader({})],
  })

  return config.webpack.extend(mainConfig)
}
