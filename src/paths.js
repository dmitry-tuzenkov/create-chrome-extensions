const path = require('path')

const ROOT = process.cwd()
const SRC = path.resolve(ROOT, 'src')
const BUILD = path.resolve(ROOT, 'build')
const DIST = path.resolve(ROOT, 'dist')
const CHROME = 'chrome'
const FIREFOX = 'firefox'

module.exports = {
  root: ROOT,

  output: {
    chrome: {
      dev: path.resolve(BUILD, CHROME, 'dev'),
      prod: path.resolve(BUILD, CHROME, 'prod'),
    },
    firefox: {
      dev: path.resolve(BUILD, FIREFOX, 'dev'),
      prod: path.resolve(BUILD, FIREFOX, 'prod'),
    },
  },

  dist: {
    firefox: {
      prod: path.resolve(DIST, FIREFOX, 'prod'),
    },
    chrome: {
      prod: path.resolve(DIST, CHROME, 'prod'),
    },
  },

  styles: path.resolve(SRC, 'common/styles'),
  outputPath: path.resolve(ROOT, 'build/dev'),
  outputPathProd: path.resolve(ROOT, 'build/prod'),
  distPath: path.resolve(ROOT, 'dist'),
  entryPath: SRC,

  entryPaths: {
    popup: path.resolve(SRC, 'popup/popup.js'),
    background: path.resolve(SRC, 'background/index.js'),
  },

  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
}
