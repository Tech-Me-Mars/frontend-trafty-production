// ~/composables/useLongdoLoader.ts
// ใช้บน client อย่างเดียว (ssr:false) เพื่อโหลดสคริปต์ Longdo Map
// ใส่ key ของคุณลงไปด้านล่าง

const LONGDO_KEY = 'cffdefc2f61c2b38e32abe2c7b7e19cd'

export const useLongdoLoader = async (): Promise<void> => {
  if (typeof window === 'undefined') return
  // ถ้าโหลดแล้ว ไม่ต้องโหลดซ้ำ
  if (window.longdo?.Map) return

  // มีสคริปต์ tag อยู่แล้วแต่ยังไม่พร้อม? รออย่างเดียว
  const existed = document.querySelector<HTMLScriptElement>('script[data-longdo-map]')
  if (!existed) {
    const s = document.createElement('script')
    s.src = `https://api.longdo.com/map3/?key=${LONGDO_KEY}`
    s.async = true
    s.defer = true
    s.setAttribute('data-longdo-map', '1')
    document.head.appendChild(s)
  }

  // รอจน window.longdo พร้อม
  await new Promise<void>((resolve) => {
    const tick = () => (window.longdo?.Map ? resolve() : setTimeout(tick, 80))
    tick()
  })
}
