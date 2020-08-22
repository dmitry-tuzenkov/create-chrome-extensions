import browserApi from '../../common/browser-api'
import { EVENTS_MAP } from '../../common/event-api'

export default ({ analytics }) => {
  browserApi.addListener((message) => {
    console.log('analytics::message', message)

    switch (message.type) {
      case EVENTS_MAP.ANALYTICS_TRACK:
        const { name, payload } = message.payload
        analytics.track(name, payload)
        break

      default:
        console.warn('Unknown event', message)
    }
  })
}
