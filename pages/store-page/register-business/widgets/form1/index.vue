<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFormStore } from '@/store/businessStore.js'

const { t, setLocale } = useI18n()
onMounted(() => setLocale('th'))

const formStore = useFormStore()

// แท็บ 3 ภาษา
const langs = [
  { code: 'th', label: 'ภาษาไทย' },
  { code: 'en', label: 'English' },
  { code: 'cn', label: '中文' },
]
const activeLangTab = ref('th')

// mock data ใช้ทำ UI เท่านั้น
const items = [
  { id: 'market',  icon: 'fa-solid fa-store',        name: { th: 'ตลาดน้ำ ตลาดวิถีชุมชน ถนนคนเดิน', en: 'Floating/Local Market', cn: '水上/社区市场 步行街' } },
  { id: 'sea',     icon: 'fa-solid fa-umbrella-beach',name: { th: 'ทะเล',                         en: 'Sea',                     cn: '海边' } },
  { id: 'mount',   icon: 'fa-solid fa-mountain',      name: { th: 'ภูเขา น้ำตก ถ้ำ',             en: 'Mountain/Waterfall/Cave', cn: '山/瀑布/洞穴' } },
  { id: 'raft',    icon: 'fa-solid fa-sailboat',      name: { th: 'แพ',                           en: 'Raft',                    cn: '竹筏' } },
  { id: 'hotspring',icon:'fa-solid fa-hot-tub-person',name: { th: 'บ่อน้ำร้อน น้ำพุร้อน',        en: 'Hot spring',              cn: '温泉' } },
  { id: 'zip',     icon: 'fa-solid fa-person-dots-from-line', name: { th: 'เครื่องเล่นโหนสลิง (Zipline)', en: 'Zipline', cn: '高空滑索' } },
  { id: 'atv',     icon: 'fa-solid fa-car',           name: { th: 'รถ ATV/Go-kart',               en: 'ATV / Go-kart',           cn: '越野车/卡丁车' } },
  { id: 'waterpark',icon:'fa-solid fa-water-ladder',  name: { th: 'สวนน้ำ',                       en: 'Water park',              cn: '水上乐园' } },
]

const selectedId = ref('')

// ไปหน้าถัดไป (ไม่มีการบันทึก/ยิง API)
const goNext = () => formStore.nextPage()
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('ประเภทแหล่งท่องเที่ยว')" :showBack="true" />

    <section class="max-w-md mx-auto px-4 pt-4 pb-10">
      <!-- แท็บภาษา -->
      <van-tabs v-model:active="activeLangTab" type="line" animated color="#202c54">
        <van-tab v-for="lang in langs" :key="lang.code" :name="lang.code" :title="lang.label">
          <!-- หัวข้อ -->
          <h2 class="text-center text-[20px] font-extrabold text-[#202c54] mt-4">
            {{ t('เลือกประเภทแหล่งท่องเที่ยว') }}
          </h2>

          <!-- การ์ด 2 คอลัมน์ -->
          <div class="grid grid-cols-2 gap-3 mt-4">
            <button
              v-for="it in items"
              :key="it.id"
              type="button"
              class="h-28 w-full bg-white border rounded-xl transition
                     text-[#202c54] text-sm leading-5 px-3 py-3 text-center
                     shadow-[0_1px_0_rgba(0,0,0,0.02)]"
              :class="selectedId === it.id
                ? 'border-[#243a8b] bg-[#eef3ff]'
                : 'border-gray-200 hover:border-[#202c54]/50'"
              @click="selectedId = it.id"
            >
              <!-- ไอคอนบนพื้นหลังจาง -->
              <div class="mx-auto mb-2 w-10 h-10 rounded-md bg-[#eef2ff] flex items-center justify-center">
                <i :class="it.icon" class="text-[18px] text-[#202c54]"></i>
              </div>
              <!-- ข้อความ 2 บรรทัด ตัด ... -->
              <span class="block clamp-2">
                {{ it.name[activeLangTab] }}
              </span>
            </button>
          </div>
        </van-tab>
      </van-tabs>

      <!-- ปุ่มถัดไป -->
      <div class="max-w-sm w-full mx-auto mt-6">
        <Button
          rounded
          :label="t('ถัดไป')"
          class="w-full h-12"
          :pt="{ root: 'bg-[#202c54] hover:bg-[#1a255c] text-white rounded-full active:scale-95 transition' }"
          @click="goNext"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ตัดข้อความ 2 บรรทัดแบบในดีไซน์ */
.clamp-2{
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
/* โทน NavBar หาก LayoutsBaseHeader ใช้ Vant */
.van-nav-bar{
  --van-nav-bar-background:#0d1a4f;
  --van-nav-bar-text-color:#fff;
  --van-nav-bar-icon-color:#fff;
  --van-nav-bar-title-text-color:#fff;
  --van-nav-bar-height:70px;
}
</style>
