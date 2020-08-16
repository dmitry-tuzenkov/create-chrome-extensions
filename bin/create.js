#!/usr/bin/env node
const path = require('path')
const spawn = require('cross-spawn')
const clArgs = require('command-line-args')
const dotenv = require('dotenv')
const cwd = process.cwd()
const { COMMAND, ARGUMENTS, STAGE, BROWSER } = require('../src/constants')
const initCommand = require('../src/init-command')
const webpackCommand = require('../src/webpack-command')

dotenv.config({ path: path.join(cwd, '.env') })

const definition = ARGUMENTS
const mainOptions = clArgs(definition, { stopAtFirstUnknown: true })

switch (mainOptions.command) {
  case COMMAND.MAN_KEY:
    spawn.sync('bash', [path.join(cwd, 'gen-key.sh')], {
      stdio: 'inherit',
    })
    break

  case COMMAND.INIT:
    const { name, folder } = mainOptions
    initCommand({ name, folder })
    break

  case COMMAND.BUILD:
  case COMMAND.START:
    const { command, stage, browser } = mainOptions
    webpackCommand({ command, stage, browser })
    break

  case COMMAND.HELP:
  default:
    const browsers = Object.values(BROWSER)
    const commands = Object.values(COMMAND)
    const stages = Object.values(STAGE)

    console.log(
      `
      Create extension toolkit

      Usage: crext <command> [command-arg]...

      where <command> is on of: 
        ${commands}
      
      Options:
        --browser, -b                       [string] browser name ${browsers} (by default \`chrome\`)
        --stage, -s                         [string] stage name ${stages} (by default \`dev\`)
        --name, -n                          [string] new extension name
        --folder, -f                        [string] new extension folder (by default name)

      crext init my-ext [-f <folder>]       init new extension \`my-ext\` in folder <folder>
      crext start -b chrome -s dev          start develop for \`chrome\` browser with \`dev\` stage
      crext build -b chrome -s prod         build extension for \`chrome\` browser with \`prod\` stage
      crext mankey                          generates an uniq manifest key for extension
      crext help  
      `
    )
    break
}
