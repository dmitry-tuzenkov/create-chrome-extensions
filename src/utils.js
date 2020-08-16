const os = require('os')
const fs = require('fs-extra')

const validateArgs = () => {
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
}

const overrideJsonSync = (filePath, data) => {
  const json = require(filePath)
  const payload = Object.assign({}, json, data)
  fs.writeFileSync(filePath, JSON.stringify(payload, null, '  ') + os.EOL)
}

module.exports = {
  overrideJsonSync,
  validateArgs,
}
