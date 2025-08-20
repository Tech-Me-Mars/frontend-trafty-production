<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLongdoLoader } from '~/composables/useLongdoLoader'
import { useFormStore } from '@/store/businessStore'

// ---------- i18n / Tabs ----------
const { t, locale, setLocale } = useI18n()
const langs = [
  { code: 'th', label: 'ภาษาไทย', locale: 'th' },
  { code: 'en', label: 'English', locale: 'en' },
  { code: 'cn', label: '中文', locale: 'cn' }
]
const activeLangTab = ref(0)
onMounted(() => setLocale('th'))
watch(activeLangTab, (i) => setLocale(langs[i].locale))

// ---------- Store ----------
const formStore = useFormStore()

// ---------- Mock data ----------
const provinces = ref([
  { id: 10, provinces_name_th: 'กรุงเทพมหานคร', provinces_name_en: 'Bangkok', provinces_name_cn: '曼谷' },
  { id: 50, provinces_name_th: 'เชียงใหม่', provinces_name_en: 'Chiang Mai', provinces_name_cn: '清迈' },
])
const districts = ref<any[]>([])
const subdistricts = ref<any[]>([])

const shop_province_id = ref<number | null>(null)
const shop_district_id = ref<number | null>(null)
const shop_subdistrict_id = ref<number | null>(null)

watch(shop_province_id, (pid) => {
  shop_district_id.value = null
  shop_subdistrict_id.value = null
  // mock
  districts.value = pid
    ? [
      { id: 1001, district_name_th: 'เขตพระนคร', district_name_en: 'Phra Nakhon', district_name_cn: '帕那空县' },
      { id: 1002, district_name_th: 'เขตปทุมวัน', district_name_en: 'Pathum Wan', district_name_cn: '巴吞旺县' }
    ]
    : []
  subdistricts.value = []
})
watch(shop_district_id, (did) => {
  shop_subdistrict_id.value = null
  subdistricts.value = did
    ? [
      { id: 100101, subdistrict_name_th: 'พระบรมมหาราชวัง', subdistrict_name_en: 'Phra Borom Maha Ratchawang', subdistrict_name_cn: '大皇宫' },
      { id: 100102, subdistrict_name_th: 'วังบูรพาภิรมย์', subdistrict_name_en: 'Wang Burapha Phirom', subdistrict_name_cn: '旺叻帕披隆' }
    ]
    : []
})

const provinceLabelField = ref<'provinces_name_th' | 'provinces_name_en' | 'provinces_name_cn'>('provinces_name_th')
const districtLabelField = ref<'district_name_th' | 'district_name_en' | 'district_name_cn'>('district_name_th')
const subdistrictLabelField = ref<'subdistrict_name_th' | 'subdistrict_name_en' | 'subdistrict_name_cn'>('subdistrict_name_th')
watch(locale, (l) => {
  provinceLabelField.value = l === 'en' ? 'provinces_name_en' : l === 'cn' ? 'provinces_name_cn' : 'provinces_name_th'
  districtLabelField.value = l === 'en' ? 'district_name_en' : l === 'cn' ? 'district_name_cn' : 'district_name_th'
  subdistrictLabelField.value = l === 'en' ? 'subdistrict_name_en' : l === 'cn' ? 'subdistrict_name_cn' : 'subdistrict_name_th'
})

// ---------- Form model (UI only) ----------
const shop_name = ref({ th: '', en: '', cn: '' })
const shop_address = ref({ th: '', en: '', cn: '' })
const shop_details = ref({ th: '', en: '', cn: '' })
const shop_phone = ref('')
const shop_days = ref<{ th: string[]; en: string[]; cn: string[] }>({ th: [], en: [], cn: [] })
const image_profile = ref<{ src: string; file: File } | null>(null)
const image_cover = ref<{ src: string; file: File } | null>(null)
const business_img = ref<{ src: string; file: File }[]>([])

const days = [
  { th: 'จันทร์', en: 'monday', cn: '周一' },
  { th: 'อังคาร', en: 'tuesday', cn: '周二' },
  { th: 'พุธ', en: 'wednesday', cn: '周三' },
  { th: 'พฤหัสบดี', en: 'thursday', cn: '周四' },
  { th: 'ศุกร์', en: 'friday', cn: '周五' },
  { th: 'เสาร์', en: 'saturday', cn: '周六' },
  { th: 'อาทิตย์', en: 'sunday', cn: '周日' }
]

// sync วันที่ระหว่างภาษา (ตาม index)
function onShopDayChange(triggerLang: 'th' | 'en' | 'cn') {
  nextTick(() => {
    const selectedIdx = days
      .map((d, i) => shop_days.value[triggerLang].includes(d[triggerLang]) ? i : -1)
      .filter(i => i !== -1)
      ; (['th', 'en', 'cn'] as const).forEach((code) => {
        if (code === triggerLang) return
        shop_days.value[code] = selectedIdx.map(i => days[i][code])
      })
  })
}

// ---------- Upload handlers ----------
const onFileSelectBg = (e: Event, target: 'profile' | 'cover') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    const obj = { src: String(ev.target?.result || ''), file }
    if (target === 'profile') image_profile.value = obj
    else image_cover.value = obj
  }
  reader.readAsDataURL(file)
}
const removeImageBg = (target: 'profile' | 'cover') => {
  if (target === 'profile') image_profile.value = null
  else image_cover.value = null
}
const galleryInput = ref<any>(null)
const galleryFull = computed(() => (business_img.value?.length || 0) >= 3)

// เปิดไฟล์ผ่าน choose(), รองรับทั้งกรณี ref เป็นเดี่ยว/อาเรย์
const triggerGalleryInput = () => {
  if (galleryFull.value) return
  const comp = Array.isArray(galleryInput.value) ? galleryInput.value[0] : galleryInput.value
  if (!comp) return
  if (typeof comp.choose === 'function') comp.choose()
  else comp?.$el?.querySelector('input[type="file"]')?.click()
}

// รับไฟล์แล้วสร้าง preview + จำกัดไม่เกิน 3
const onGallerySelect = (event: any) => {
  const files: File[] = event?.files ?? []
  if (!files.length) return

  const remain = Math.max(0, 3 - business_img.value.length)
  const toAdd = files.slice(0, remain)

  toAdd.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      business_img.value.push({ src: e.target.result as string, file })
    }
    reader.readAsDataURL(file)
  })
}

// ลบรายการ
const removeGallery = (index: number) => {
  if (index < 0) return
  business_img.value.splice(index, 1)
}
// อ้างอิง FileUpload
const fileInput = ref<any>(null)

// เปิดไฟล์ด้วย choose() — ตามที่คุณต้องการใช้ fileInput.value[0].choose()
const triggerFileInput = () => {
  if ((business_img.value?.length || 0) >= 3) return
  try {
    // กรณี ref เป็นอาเรย์
    fileInput.value[0].choose()
  } catch {
    // เผื่อกรณีเป็น single ref
    fileInput.value?.choose?.()
  }
}

// รับไฟล์ → ทำ preview → ใส่ array (จำกัดไม่เกิน 3 รูป)
const onFileSelect = (event: any) => {
  const files: File[] = event?.files ?? []
  if (!files.length) return

  // คำนวณจำนวนที่ยังรับได้
  const remain = Math.max(0, 3 - business_img.value.length)
  const toAdd = files.slice(0, remain)

  toAdd.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      business_img.value.push({ src: e.target.result as string, file })
    }
    reader.readAsDataURL(file)
  })
}

// ลบรูปจากรายการ
const removeImage = (index: number) => {
  if (index < 0) return
  business_img.value.splice(index, 1)
}


// ---------- Social media mock ----------
type SM = { id: string; name: { th: string; en: string; cn: string }; icon: string; }
const socialOptions: SM[] = [
  { id: 'facebook', name: { th: 'Facebook', en: 'Facebook', cn: '脸书' }, icon: 'fa-brands fa-facebook' },
  { id: 'instagram', name: { th: 'Instagram', en: 'Instagram', cn: '照片墙' }, icon: 'fa-brands fa-instagram' },
  { id: 'line', name: { th: 'LINE', en: 'LINE', cn: 'LINE' }, icon: 'fa-brands fa-line' },
]
const socials = ref<{ social_media_id?: string; social_media_link?: string }[]>([
  { social_media_id: undefined, social_media_link: '' }
])

// ---------- Map ----------
let map: any = null
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)

const mapHosts = ref<HTMLElement[]>([])       // placeholder per-tab
const setMapHost = (el: HTMLElement | null, idx: number) => { if (el) mapHosts.value[idx] = el }
const moveMapToTab = async (idx: number) => {
  await nextTick()
  const mapDiv = document.getElementById('map')
  const host = mapHosts.value[idx]
  if (mapDiv && host) {
    host.appendChild(mapDiv)
    mapDiv.style.display = 'block'
    setTimeout(() => { try { map?.resize() } catch { } }, 100)
  }
}

const initMap = () => {
  const el = document.getElementById('map')
  if (!el || !window.longdo) return
  map = new window.longdo.Map({
    placeholder: el,
    zoom: 12,
    location: { lat: 13.736717, lon: 100.523186 }
  })
}

const clearMarkers = () => { try { map?.Overlays?.clear() } catch { } }

const addMarkerAtCenter = () => {
  if (!map) return
  clearMarkers()
  const c = map.location()
  const m = new longdo.Marker(
    { lat: c.lat, lon: c.lon },
    { title: t('ตำแหน่งตรงกลาง'), icon: { url: '/image/marker-blue.png', size: { width: 40, height: 45 } } }
  )
  map.Overlays.add(m)
  latitude.value = c.lat
  longitude.value = c.lon
}

// ------- (optional) ค้นหา Longdo Search API ฝั่ง client -------
const textSearchMap = ref<any>(null)
const resLocation = ref<any[]>([])
const search = (event: any) => {
  setTimeout(async () => {
    const q = String(event.query || '').trim()
    if (q.length < 4) { resLocation.value = []; return }
    try {
      const r = await fetch(`https://search.longdo.com/mapsearch/json/search?keyword=${encodeURIComponent(q)}&limit=20&key=cffdefc2f61c2b38e32abe2c7b7e19cd`)
      const json = await r.json()
      resLocation.value = (json?.data || []).map((i: any) => ({
        id: i.id, name: i.name, address: i.address || t('ไม่มีที่อยู่'), lat: i.lat, lon: i.lon
      }))
    } catch (e) { console.error(e) }
  }, 250)
}
const onLocationSelect = (opt: any) => {
  if (!opt?.lat || !opt?.lon || !map) return
  clearMarkers()
  const m = new longdo.Marker(
    { lat: opt.lat, lon: opt.lon },
    { title: t('ตำแหน่งที่เลือก'), icon: { url: '/image/marker-blue.png', size: { width: 40, height: 45 } } }
  )
  map.Overlays.add(m)
  map.location({ lat: opt.lat, lon: opt.lon }, true)
  latitude.value = opt.lat
  longitude.value = opt.lon
}

// ---------- Lifecycle ----------
onMounted(async () => {
  await useLongdoLoader()
  await nextTick()
  initMap()
  moveMapToTab(activeLangTab.value)
})

// ---------- Next ----------
const goNext = () => {
  formStore.nextPage()
}
</script>
<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('ข้อมูลธุรกิจในแหล่งท่องเที่ยว')">
      <template #left>
        <ButtonIconBack @click="formStore.prevPage()" />
      </template>
    </LayoutsBaseHeader>
        <section class="max-w-[430px] mx-auto">

    <!-- map สร้างครั้งเดียว แล้วย้ายไปที่ host ของแท็บ -->
    <div id="map" class="hidden" style="width:100%;height:100%"></div>

    <van-tabs v-model:active="activeLangTab" type="line" sticky animated color="#202c54" :line-width="100" @change="moveMapToTab">
      <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx">
        <div class="p-3 ">
          <!-- 🧩 Single Card -->
          <section class="card p-0 overflow-hidden">
            <div class=" ">
              <!-- Uploads: profile & cover -->
              <div class="p-4">
                <h4 class="section-title">{{ t('รูปภาพธุรกิจ') }}</h4>
                <div class="grid sm:grid-cols-1 gap-4">
                  <!-- โปรไฟล์ -->
                  <div>
                    <p class="text-sm text-zinc-500 mb-2">{{ t('อัพโหลดรูปภาพโปรไฟล์') }}</p>

                    <div class="flex items-center gap-3">
                      <template v-if="image_profile?.src">
                        <div class="relative">
                          <Image :src="image_profile.src" alt="profile" width="50" preview
                            :pt="{ image: { class: 'object-cover w-16 h-16 rounded-lg border' } }" />
                          <!-- ปุ่มลบเหมือนกัน (overlay) -->
                          <i class="fa-solid fa-xmark absolute -top-1.5 -right-1.5 bg-white/90 rounded-full shadow p-1
                   cursor-pointer hover:bg-red-500 hover:text-white transition" @click="removeImageBg('profile')" />
                        </div>
                      </template>

                      <template v-else>
                        <label class="upload-box">
                          <i class="pi pi-plus" />
                          <input type="file" accept="image/*" class="hidden"
                            @change="(e) => onFileSelectBg(e, 'profile')" />
                        </label>
                      </template>
                    </div>
                  </div>

                  <!-- หน้าปก -->
                  <div>
                    <p class="text-sm text-zinc-500 mb-2">{{ t('อัพโหลดรูปภาพหน้าปก') }}</p>

                    <div class="flex items-center gap-3">
                      <template v-if="image_cover?.src">
                        <div class="relative">
                          <Image :src="image_cover.src" alt="cover" width="50" preview
                            :pt="{ image: { class: 'object-cover w-16 h-16 rounded-lg border' } }" />
                          <!-- ปุ่มลบเหมือนกัน (overlay) -->
                          <i class="fa-solid fa-xmark absolute -top-1.5 -right-1.5 bg-white/90 rounded-full shadow p-1
                   cursor-pointer hover:bg-red-500 hover:text-white transition" @click="removeImageBg('cover')" />
                        </div>
                      </template>

                      <template v-else>
                        <label class="upload-box">
                          <i class="pi pi-plus" />
                          <input type="file" accept="image/*" class="hidden"
                            @change="(e) => onFileSelectBg(e, 'cover')" />
                        </label>
                      </template>
                    </div>
                  </div>
                </div>

                <!-- แกลเลอรี -->
                <div class="mt-4">
                  <p class="text-sm text-zinc-500 mb-2">
                    {{ t('อัพโหลดรูปภาพ') }} ({{ t('ไม่เกิน') }} 3 {{ t('รูป') }})
                  </p>

                  <div class="flex flex-wrap gap-2 mb-3 relative">
                    <!-- รายการรูป -->
                    <div v-for="(image, index) in business_img" :key="index" class="relative">
                      <!-- แสดงภาพแบบเดียวกับโปรไฟล์/หน้าปก -->
                      <Image :src="image.src" alt="Image" width="50" class="object-cover"
                        :pt="{ image: { class: 'object-cover w-12 h-12 rounded-md' } }" preview />
                      <!-- ปุ่มลบมุมขวาบน -->
                      <i class="fa-solid fa-xmark absolute top-0 right-0 p-0.5 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-red-300"
                        @click="removeImage(index)"></i>
                    </div>

                    <!-- FileUpload (ซ่อน) + ปุ่ม "+" เปิดเลือกไฟล์ ด้วย choose() -->
                    <div class="flex">
                      <label
                        class="w-12 h-12 border-2 border-dotted border-blue-900 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-600"
                        :class="{ 'opacity-50 pointer-events-none': (business_img?.length || 0) >= 3 }"
                        @click="triggerFileInput">
                        <i class="pi pi-plus text-2xl text-gray-600 hover:scale-110 transition-transform"></i>
                      </label>

                      <!-- ซ่อน input จริง ใช้ choose() เปิด -->
                      <FileUpload ref="fileInput" id="upload-image-store" inputId="upload-image-store" mode="basic"
                        accept="image/*" customUpload :auto="true" :multiple="true" class="!hidden"
                        @select="onFileSelect" />
                    </div>
                  </div>

                  <p class="error-text" v-if="errors?.business_img">
                    {{ t('กรุณาเลือกอย่างน้อย') }} 1 {{ t('ภาพ') }}
                  </p>
                </div>

              </div>

              <!-- Map + Search -->
              <div class="p-4">
                <h4 class="section-title">{{ t('พิกัดสถานที่ท่องเที่ยวหรือธุรกิจ') }}</h4>
                <AutoComplete v-model="textSearchMap" forceSelection optionLabel="name" :suggestions="resLocation"
                  :placeholder="`${t('ค้นหาสถานที่ใกล้เคียง')}...`" @complete="search"
                  @item-select="({ value }) => onLocationSelect(value)" inputClass="custom-border w-full">
                  <template #option="{ option }">
                    <div class="py-2">
                      <p class="font-medium text-primary-main">{{ option?.name }}</p>
                      <p class="text-xs text-zinc-500">{{ option?.address }}</p>
                    </div>
                  </template>
                </AutoComplete>

                <div class="h-64 mt-2 rounded-lg overflow-hidden border" :ref="el => setMapHost(el!, idx)">
                </div>
                <div class="mt-2">
                  <p class="text-xs text-zinc-600" v-if="latitude && longitude">
                    {{ t('ตำแหน่ง') }}: {{ latitude }}, {{ longitude }}
                  </p>
                  <Button icon="fa-solid fa-location-dot" size="small" outlined @click="addMarkerAtCenter"
                    :label="t('ปักหมุดตรงกลาง')" />
                </div>
              </div>

              <!-- Business fields -->
              <div class="p-4 space-y-3">
                <h4 class="section-title">{{ t('ข้อมูลธุรกิจ') }}</h4>

                <div>
                  <label class="label">{{ t('ชื่อธุรกิจในแหล่งท่องเที่ยว') }}</label>
                  <InputText v-model="shop_name[lang.code]" class="w-full custom-border"
                    :placeholder="t('ชื่อธุรกิจในแหล่งท่องเที่ยว')" />
                </div>
                <div>
                  <label class="label">{{ t('ที่อยู่ธุรกิจในแหล่งท่องเที่ยว') }}</label>
                  <InputText v-model="shop_address[lang.code]" class="w-full custom-border"
                    :placeholder="t('ที่อยู่ธุรกิจ')" />
                </div>

                <div class="grid sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-1">
                    <label class="label">{{ t('จังหวัด') }}</label>
                    <Dropdown v-model="shop_province_id" :options="provinces" optionValue="id"
                      :optionLabel="provinceLabelField" class="w-full custom-border" :placeholder="t('เลือกจังหวัด')" />
                  </div>
                  <div class="sm:col-span-1">
                    <label class="label">{{ t('อำเภอ') }}</label>
                    <Dropdown v-model="shop_district_id" :options="districts" optionValue="id"
                      :optionLabel="districtLabelField" class="w-full custom-border" :placeholder="t('เลือกอำเภอ')" />
                  </div>
                  <div class="sm:col-span-1">
                    <label class="label">{{ t('ตำบล') }}</label>
                    <Dropdown v-model="shop_subdistrict_id" :options="subdistricts" optionValue="id"
                      :optionLabel="subdistrictLabelField" class="w-full custom-border" :placeholder="t('เลือกตำบล')" />
                  </div>
                </div>

                <div>
                  <label class="label">{{ t('วันที่ทำการ') }}</label>
                  <div class="grid grid-cols-3 gap-x-6 gap-y-3">
                    <div v-for="d in days" :key="d[lang.code]" class="flex items-center gap-2">
                      <Checkbox v-model="shop_days[lang.code]" :inputId="`${d[lang.code]}-${lang.code}`"
                        :value="d[lang.code]" @change="onShopDayChange(lang.code)" />
                      <label :for="`${d[lang.code]}-${lang.code}`" class="text-sm">{{ d[lang.code]
                      }}</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="label">{{ t('เบอร์ติดต่อ') }}</label>
                  <InputText v-model="shop_phone" class="w-full custom-border" :placeholder="t('เบอร์โทรศัพท์')" />
                </div>

                <div>
                  <label class="label">{{ t('รายละเอียดธุรกิจในแหล่งท่องเที่ยว') }}</label>
                  <InputText v-model="shop_details[lang.code]" class="w-full custom-border" />
                </div>
              </div>

              <!-- Social -->
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="section-title">{{ t('โซเชียลมีเดีย') }}</h4>
                  <Button size="small" :label="t('เพิ่มรายการโซเชียล')" :pt="{
                               
                                root: {
                                    class: '!bg-primary-second'
                                },

                            }"
                    @click="socials.push({ social_media_id: undefined, social_media_link: '' })" />
                </div>

                <div class="space-y-3">
                  <div v-for="(s, i) in socials" :key="i" class="grid grid-cols-[10rem,1fr,2.5rem] gap-2">
                    <Select v-model="s.social_media_id" :options="socialOptions" optionValue="id"
                      class="custom-border w-full"
                      :optionLabel="locale === 'en' ? 'name.en' : locale === 'cn' ? 'name.cn' : 'name.th'">
                      <template #value="{ value }">
                        <span v-if="value" class="flex items-center gap-2">
                          <i :class="socialOptions.find(o => o.id === value)?.icon" />
                          <span>{{(socialOptions.find(o => o.id === value) as any)?.name[locale]
                          }}</span>
                        </span>
                        <span v-else class="text-zinc-500">{{ t('ประเภทโซเชียล') }}</span>
                      </template>
                      <template #option="{ option }">
                        <span class="flex items-center gap-2">
                          <i :class="option.icon" />
                          <span>{{ option.name[locale] }}</span>
                        </span>
                      </template>
                    </Select>

                    <InputText v-model="s.social_media_link" class="custom-border w-full"
                      :placeholder="t('ลิงก์โซเชียล')" />
                    <Button icon="pi pi-times" severity="danger" rounded @click="socials.splice(i, 1)" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 bg-zinc-50 border-t">
              <Button :label="t('ถัดไป')" severity="primary" rounded class="w-full"
                :pt="{ root: { class: '!border-primary-main' } }" @click="goNext" />
            </div>
          </section>
        </div>
      </van-tab>
    </van-tabs>
    </section>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-sm border border-zinc-200;
}

.section-title {
  @apply font-semibold text-zinc-800 mb-2;
}

.label {
  @apply text-sm text-zinc-600;
}

.custom-border :deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-select) {
  @apply w-full;
}

.upload-box {
  @apply w-12 h-12 rounded-md border-2 border-dotted border-indigo-900 flex items-center justify-center cursor-pointer hover:border-zinc-600;
}
</style>
