export default (type = 'local') => {
  const localOrSync = type === 'local' ? 'local' : 'sync'
  const storage = chrome.storage[localOrSync]

  return {
    setItem(key, value) {
      return new Promise((resolve) => {
        const payload = {
          [key]: value,
        }
        storage.set(payload, resolve)
      })
    },

    getItem(key) {
      return new Promise((resolve) => {
        storage.get([key], (result) => resolve(result[key]))
      })
    },

    removeItem(key) {
      return new Promise((resolve) => {
        storage.remove([key], resolve)
      })
    },
  }
}
