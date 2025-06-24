// ~/composables/useCookieEncrypt.js
import { encryptData, decryptData } from '@/utils/crypto'

export function useCookieEncrypt(name, options) {
  const raw = useCookie(name, options)

  return computed({
    get() {
      if (!raw.value) return null
      return decryptData(raw.value)
    },
    set(val) {
      raw.value = val ? encryptData(val) : null
    }
  })
}
