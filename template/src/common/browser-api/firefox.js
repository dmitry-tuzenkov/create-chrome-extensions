import chrome from './chrome'

export default {
  ...chrome,

  getStoreUrl() {
    return 'https://addons.mozilla.org'
  },
}
