const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const debug = require('debug')('crext:create')

// TODO: Move to utils
const overrideJsonSync = (filePath, data) => {
  const json = require(filePath)
  const payload = Object.assign({}, json, data)
  fs.writeFileSync(filePath, JSON.stringify(payload, null, '  ') + os.EOL)
}

// const mainOptions = clArgs(
//   [
//     {
//       name: 'name',
//       defaultOption: true,
//       type: String,
//     },
//     {
//       name: 'folder',
//       alias: 'f',
//       defaultValue: null,
//       type: String,
//     },
//   ],
//   { stopAtFirstUnknown: true }
// )

// const { folder, name } = mainOptions

module.exports = ({ folder, name }) => {
  debug('process argv is', process.argv)

  if (!name) {
    console.log(
      `
    Create extension project
    Usage crext init <appname> [-f <folder>]
    
    crext init my-ext
    crext init my-ext --f my-ext
    crext init my-ext --folder my-ext
    `
    )
    process.exit(0)
  }

  const cwd = process.cwd()
  const appName = name.toLocaleLowerCase()
  const appFolder = !folder ? appName : folder

  const TEMPLATE_PATH = path.join(__dirname, '../template')
  const APP_PATH = path.join(cwd, appFolder)

  if (fs.existsSync(APP_PATH)) {
    console.error('Application already exist, take another name')
    process.exit(0)
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

    console.log('Project has been init')
    console.log('cd ' + appFolder)
    console.log('Dont forget!')
    console.log('npm i ')
    console.log('npm run - check scripts')
  } catch (ex) {
    console.error('Failed to create project', ex)
  }
}
