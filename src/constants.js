const BROWSER = {
  CHROMIUM: 'chromium',
  CHROME: 'chrome',
  FIREFOX: 'firefox',
}

const COMMAND = {
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
    defaultValue: BROWSER.CHROME,
    type: String,
  },
  {
    name: 'stage',
    defaultValue: 'dev',
    type: String,
  },
]

module.exports = {
  ARGUMENTS,
  BROWSER,
  COMMAND,
}
