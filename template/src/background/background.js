import settings from '../settings'
import browserApi from '../common/browser-api'
import initAnalytics from '../background/services/analytics'
import initIdentity from '../background/services/identity'
import listenAnalytics from './listeners/analytics'
import listenInstall from './listeners/install'

console.log('settings', settings)
console.log('browserApi', {
  browser: settings.__BROWSER__,
  id: browserApi.getExtensionId(),
  storeUrl: browserApi.getStoreUrl(),
  runtimeUrl: browserApi.getExtensionUrl(),
})

listenInstall()
;(async () => {
  const { getIdentity } = await initIdentity()
  const id = await getIdentity()
  const analytics = initAnalytics({ id })
  listenAnalytics({ analytics })
})()

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
