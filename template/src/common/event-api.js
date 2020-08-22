import browserApi from './browser-api'

export const EVENTS_MAP = {
  ANALYTICS_TRACK: 'analytics/track',
}

export const createEvent = (type, payload) => ({
  type,
  payload,
})

export const publish = (event, callback) => {
  browserApi.sendMessage(event, callback)
}

export const handleEvent = (event) => {}
