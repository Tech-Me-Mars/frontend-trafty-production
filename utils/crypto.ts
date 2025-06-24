// ~/utils/crypto.ts
import CryptoJS from 'crypto-js'
const runtimeConfig = useRuntimeConfig()

const SECRET_KEY = runtimeConfig.public.aqaz2wsx3ed // 👉 เปลี่ยนให้ยากและซ่อนไว้ใน .env ใน production

export function encryptData<T>(data: T): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  return ciphertext
}

export function decryptData<T>(ciphertext: string): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Decrypt failed:', error)
    return null
  }
}
