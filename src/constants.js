const BROWSER = {
  CHROMIUM: 'chromium',
  CHROME: 'chrome',
  FIREFOX: 'firefox',
}

const STAGE = {
  DEV: 'dev',
  PROD: 'prod',
}

const COMMAND = {
  HELP: 'help',
  INIT: 'init',
  START: 'start',
  BUILD: 'build',
  MAN_KEY: 'mankey',
  // TODO: Tests
  // TODO: E2E tests with puppeteer
  // TODO: Storybook
  // TODO: Licenses
}

const ARGUMENTS = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
  },
  {
    name: 'browser',
    alias: 'b',
    defaultValue: BROWSER.CHROME,
    type: String,
  },
  {
    name: 'stage',
    alias: 's',
    defaultValue: 'dev',
    type: String,
  },
  {
    name: 'name',
    alias: 'n',
    defaultOption: false,
    type: String,
  },
  {
    name: 'folder',
    alias: 'f',
    defaultValue: null,
    type: String,
  },
]

module.exports = {
  ARGUMENTS,
  BROWSER,
  COMMAND,
  STAGE,
}
