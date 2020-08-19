const CHROME_WEBSTORE_URL = 'https://chrome.google.com/webstore'

export default {
  getExtensionId() {
    return chrome.runtime.id
  },

  getStoreUrl() {
    return CHROME_WEBSTORE_URL
  },

  getExtensionUrl() {
    return chrome.runtime.getURL('')
  },

  getCurrentTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tab) =>
        resolve(tab[0])
      )
    })
  },

  getTabById(tabid) {
    return new Promise((resolve) => {
      chrome.tabs.get(tabid, (tab) => resolve(tab))
    })
  },

  getAllTabs() {
    return new Promise((resolve) => {
      chrome.tabs.query({}, (tabs) => resolve(tabs))
    })
  },

  createTab(props, callback) {
    return chrome.tabs.create(props, callback)
  },

  setUninstallUrl(url) {
    chrome.runtime.setUninstallURL(url)
  },

  onInstalled(callback) {
    chrome.runtime.onInstalled.addListener(callback)
  },

  sendMessage(message, callback) {
    chrome.runtime.sendMessage(message, callback)
  },

  sendMessageToTab(tabId, message) {
    chrome.tabs.sendMessage(tabId, message)
  },

  addListener(handler) {
    chrome.runtime.onMessage.addListener(handler)
  },

  removeListener(handler) {
    chrome.runtime.onMessage.removeListener(handler)
  },

  createContextMenus(props, callback) {
    return chrome.contextMenus.create(props, callback)
  },

  createNotification(props) {
    return chrome.notifications.create(props)
  },
}
