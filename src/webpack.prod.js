/* eslint no-undef: 0 */
const { join } = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ZipWebpackPlugin = require('zip-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const cwd = process.cwd()

const commonPaths = require('./paths')
const commonConfig = require('./webpack.common.js')
const packageJson = require(join(cwd, './package.json'))
const buildNumber = Number(process.env.BUILD_NUMBER) || 0

module.exports = (config) => {
  const BROWSER = config.args.browser
  const STAGE = config.args.stage
  const ANALYZE = config.args.analyze
  const outputPath = commonPaths.output[BROWSER][STAGE]
  const distPath = commonPaths.dist[BROWSER][STAGE]
  const NAME = packageJson.name.toUpperCase()
  const VERSION = `${packageJson.version}.${buildNumber}`
  const zipFileName = [NAME, BROWSER, STAGE, VERSION].join('_')

  const mainConfig = merge(commonConfig(config.webpack, config.args), {
    mode: 'production',
    devtool: '',
    output: {
      path: outputPath,
    },
    module: {
      rules: [
        {
          test: /^((?!\.local).)*\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
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
    plugins: [
      new ProgressBarWebpackPlugin(),

      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', distPath + '/**/*'],
      }),

      new MiniCssExtractPlugin({
        filename: `${commonPaths.cssFolder}/[name].css`,
        chunkFilename: '[id].css',
      }),

      new ZipWebpackPlugin({
        path: commonPaths.distPath,
        filename: zipFileName,
      }),
    ],
  })

  if (ANALYZE) {
    mainConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  return config.webpack.extend(mainConfig)
}
