import settings from '../settings'
import browserApi from '../common/browser-api'

console.log('settings', settings)
console.log('browserApi', {
  browser: settings.__BROWSER__,
  id: browserApi.getExtensionId(),
  storeUrl: browserApi.getStoreUrl(),
  runtimeUrl: browserApi.getExtensionUrl(),
})

const INSTALL_REASON = {
  INSTALL: 'install',
  UPDATE: 'update',
}

browserApi.onInstalled((details) => {
  if (details.reason === INSTALL_REASON.INSTALL) {
    console.log(`Extension has been installed`, details)
  }

  if (details.reason === INSTALL_REASON.UPDATE) {
    console.log(`Extension has been updated`, details)
  }
})

browserApi.createContextMenus({
  id: 'about-extension',
  contexts: ['browser_action'],
  title: 'About',
  onclick: () => {
    browserApi.createTab({
      url: settings.ABOUT_URL,
      active: true,
    })
  },
})

browserApi.createContextMenus({
  id: 'privacy-policy',
  contexts: ['browser_action'],
  title: 'Privacy Policy',
  onclick: () => {
    browserApi.createTab({
      url: settings.PRIVACY_POLICY_URL,
      active: true,
    })
  },
})
