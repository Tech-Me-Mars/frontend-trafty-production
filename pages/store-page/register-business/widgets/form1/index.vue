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
  { code: 'cn', label: '中文' }
]
const activeLangTab = ref('th')

// mock data ใช้ทำ UI เท่านั้น
const items = [
  { id: 'market', icon: 'fa-solid fa-store', name: { th: 'ตลาดน้ำ ตลาดวิถีชุมชน ถนนคนเดิน', en: 'Floating/Local Market', cn: '水上/社区市场 步行街' } },
  { id: 'sea', icon: 'fa-solid fa-umbrella-beach', name: { th: 'ทะเล', en: 'Sea', cn: '海边' } },
  { id: 'mount', icon: 'fa-solid fa-mountain', name: { th: 'ภูเขา น้ำตก ถ้ำ', en: 'Mountain/Waterfall/Cave', cn: '山/瀑布/洞穴' } },
  { id: 'raft', icon: 'fa-solid fa-sailboat', name: { th: 'แพ', en: 'Raft', cn: '竹筏' } },
  { id: 'hotspring', icon: 'fa-solid fa-hot-tub-person', name: { th: 'บ่อน้ำร้อน น้ำพุร้อน', en: 'Hot spring', cn: '温泉' } },
  { id: 'zip', icon: 'fa-solid fa-person-dots-from-line', name: { th: 'เครื่องเล่นโหนสลิง (Zipline)', en: 'Zipline', cn: '高空滑索' } },
  { id: 'atv', icon: 'fa-solid fa-car', name: { th: 'รถ ATV/Go-kart', en: 'ATV / Go-kart', cn: '越野车/卡丁车' } },
  { id: 'waterpark', icon: 'fa-solid fa-water-ladder', name: { th: 'สวนน้ำ', en: 'Water park', cn: '水上乐园' } },
]

const selectedId = ref('')
const choose = (id) => { selectedId.value = id }
const goNext = () => formStore.nextPage()
</script>

<template>
  <div class="bg-[#EEF0F3] min-h-screen">
    <!-- Header ของคุณ (มีเส้นทองด้านล่างอยู่แล้ว) -->
    <LayoutsBaseHeader :title="t('ประเภทธุรกิจในแหล่งท่องเที่ยว')" :showBack="true" />

    <main class="max-w-[430px] mx-auto">
      <!-- แถบภาษา -->
      <van-tabs v-model:active="activeLangTab" type="line" color="#202c54" :line-width="100" animated>
        <van-tab v-for="lang in langs" :key="lang.code" :name="lang.code" :title="lang.label">
          <!-- พื้นหลังเทาอ่อน + การ์ดขาวด้านในตามภาพ -->
          <section class="px-3 pb-8 pt-3 bg-[#EEF0F3]">
            <!-- Title -->
            <h2 class="text-center text-[19px] sm:text-[20px] font-extrabold text-[#202c54] tracking-tight my-3">
              {{ t('เลือกประเภทแหล่งท่องเที่ยว') }}
            </h2>
            <div class=" ">


              <div class="grid grid-cols-2 gap-3 mt-3.5">
                <button v-for="it in items" :key="it.id" type="button" class="tile shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                  :class="selectedId === it.id ? 'tile--active' : 'tile--normal'" @click="choose(it.id)">
                  <div class="icon-wrap">
                    <!-- fixed-width + normalize line-height -->
                    <i :class="[it.icon, 'fa-fw', 'icon']"></i>
                  </div>

                  <!-- พื้นที่ข้อความ 2 บรรทัดคงที่ -->
                  <span class="name clamp-2">
                    {{ it.name[activeLangTab] }}
                  </span>
                </button>
              </div>
            </div>

            <!-- ปุ่มถัดไป -->
            <div class="mt-5 px-1">
              <Button rounded :label="t('ถัดไป')" class="w-full h-12" :pt="{
                root: 'bg-[#202c54] hover:bg-[#1b244d] text-white rounded-full active:scale-95 transition'
              }" @click="goNext" />
            </div>
          </section>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<style>
.tile {
  @apply flex flex-col items-center justify-start bg-white rounded-sm border px-3 py-3 text-center shadow-sm transition;
}

.tile--normal {
  @apply border-zinc-200 hover:border-[#202c54]/50;
}

.tile--active {
  @apply border-[#243a8b] bg-[#eef3ff];
}

/* กล่องไอคอนขนาดคงที่ */
.icon-wrap {
  @apply w-10 h-10 rounded-md bg-[#eef2ff] flex items-center justify-center mb-2;
}

/* ทำให้ไอคอนอยู่ระดับเดียวกันทุกใบ */
.icon {
  @apply text-[18px] text-[#202c54];
  line-height: 1;
  display: block;
}

/* ชื่อ: สูงเท่ากับ 2 บรรทัดเสมอ (text-sm/leading-5 => 20px x 2 = 40px) */
.name {
  @apply text-[#202c54] text-sm leading-5 min-h-10;
}

/* ตัดข้อความ 2 บรรทัด */
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
