import { v4 as uuid } from 'uuid'

import storageApi from '../../common/storage-api'

const IDENTITY_KEY = '__id__'

// TODO: Use your identity calculation instead
const generateIdentity = () => uuid()

export default async () => {
  const { getItem, setItem } = storageApi('local')
  const id = await getItem(IDENTITY_KEY)

  if (!id) {
    await setItem(IDENTITY_KEY, generateIdentity())
  }

  return {
    async getIdentity() {
      return getItem(IDENTITY_KEY)
    },

    async setIdentity(id) {
      return setItem(IDENTITY_KEY, id)
    },

    async getVal(key) {
      return getItem(key)
    },

    async setVal(key, val) {
      return setItem(key, val)
    },
  }
}
