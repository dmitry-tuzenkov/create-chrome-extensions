import settings from '../settings'
import browserApi from '../common/browser-api'

console.log('settings', settings)
console.log('browserApi', {
  storeUrl: browserApi.getStoreUrl(),
  extensionId: browserApi.getExtensionId(),
})
