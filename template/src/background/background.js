import settings from '../settings'
import browserApi from '../common/browser-api'
import initAnalytics from '../background/services/analytics'
import initIdentity from '../background/services/identity'

const iconUrl = '/assets/icons/icons8-chrome-100.png'

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

browserApi.onInstalled(async (details) => {
  let message
  const { getIdentity, setVal } = await initIdentity()
  const id = await getIdentity()
  const analytics = initAnalytics({ id })

  if (details.reason === INSTALL_REASON.INSTALL) {
    console.log(`Extension has been installed`, details)
    message = 'Extension has been installed'
    browserApi.setUninstallUrl(settings.UNINSTALL_URL)
    analytics.trackInstall()
    setVal('installedAt', Date.now())
  }

  if (details.reason === INSTALL_REASON.UPDATE) {
    console.log(`Extension has been updated`, details)
    message = 'Extension has been updated'
    analytics.trackUpdate({ prevVer: details.previousVersion })
    analytics.trackAlive()
  }

  browserApi.createNotification({
    message: `${message} - Thanks for using Crext!`,
    title: 'Extension',
    type: 'basic',
    iconUrl,
  })
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
