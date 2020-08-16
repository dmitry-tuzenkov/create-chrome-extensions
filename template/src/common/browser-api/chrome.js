const getExtensionId = () => {
  return chrome.runtime.id
}

export default {
  getExtensionId,

  getStoreUrl() {
    return 'https://chrome.google.com/webstore'
  },
}
