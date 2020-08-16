const path = require('path')
const fs = require('fs-extra')
const debug = require('debug')('crext:init')
const { overrideJsonSync } = require('./utils')

module.exports = ({ folder, name }) => {
  debug('process argv is', process.argv)

  if (!name) {
    console.error('Error:')
    console.error(' Name is required attribute!')
    return
  }

  const cwd = process.cwd()
  const appName = name.toLocaleLowerCase()
  const appFolder = !folder ? appName : folder

  const TEMPLATE_PATH = path.join(__dirname, '../template')
  const APP_PATH = path.join(cwd, appFolder)

  if (fs.existsSync(APP_PATH)) {
    console.error('Error:')
    console.error(` Application '${appName}' already exist, take another name!`)
    return
  }

  debug('APP_PATH', APP_PATH)
  debug('TEMPLATE_PATH', TEMPLATE_PATH)
  debug('name', name)
  debug('folder', appFolder)

  try {
    fs.copySync(TEMPLATE_PATH, APP_PATH)

    overrideJsonSync(path.join(APP_PATH, 'package.json'), {
      name: appName,
      version: '1.0.0',
    })

    overrideJsonSync(path.join(APP_PATH, 'manifest.json'), {
      name: appName,
      short_name: appName,
      version: '1.0.0.0',
    })

    console.log(
      `
      New extension \`${appName}\` has been initialized!

      Next steps:
        1) cd ${appFolder}
        2) npm install
        3) npm run 

        
        
      Good luck and may the Force be with you!

      Thank you for using package!


      `
    )
  } catch (ex) {
    console.error('Error:')
    console.error(' Failed to init extension')
    console.error(ex)
  }
}
