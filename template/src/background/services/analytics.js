import settings from '../../settings'
import browserApi from '../../common/browser-api'

const getIdentify = (id) =>
  `${settings.HEAP_ANALYTICS_ID}:${browserApi.getExtensionId()}_${id}`

export default ({ id }) => {
  console.log('Analytics:initialize', { id: getIdentify(id) })

  return {
    track(name, options) {
      console.log('Analytics:track', { id: getIdentify(id), name, options })
    },

    trackInstall() {
      console.log('Analytics:trackInstall', { id: getIdentify(id) })
    },

    trackUpdate({ prevVer }) {
      console.log('Analytics:trackUpdate', {
        id: getIdentify(id),
        prevVer,
        ver: browserApi.getExtensionVersion(),
      })
    },

    trackAlive() {
      this.track('alive')
    },
  }
}
