import chrome from './chrome'

const FIREFOX_WEBSTORE_URL = 'https://addons.mozilla.org'

export default {
  ...chrome,

  getStoreUrl() {
    return FIREFOX_WEBSTORE_URL
  },
}
