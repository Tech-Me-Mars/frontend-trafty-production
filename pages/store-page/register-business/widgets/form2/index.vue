<script setup>
definePageMeta({ middleware: ['auth'] })

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

// ข้อมูล (UI เท่านั้น)
const businessModels = [
  {
    id: 'gov',
    name: { th: 'หน่วยงานรัฐ', en: 'Government Agency', cn: '政府机构' },
  },
  {
    id: 'soe',
    name: { th: 'รัฐวิสาหกิจ', en: 'State Enterprise', cn: '国有企业' },
  },
  {
    id: 'juristic',
    name: { th: 'นิติบุคคล', en: 'Juristic Person', cn: '法人' },
  },
  {
    id: 'person',
    name: { th: 'บุคคล', en: 'Individual', cn: '个人' },
  },
]

const selectedId = ref('gov') // ค่าเริ่มต้นให้ตรงภาพ

const goNext = () => {
  formStore.nextPage()
}
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('หน่วยงานแหล่งท่องเที่ยว')">
      <template #left>
        <ButtonIconBack @click="formStore.prevPage()" />
      </template>
    </LayoutsBaseHeader>

    <section class="max-w-md mx-auto px-4 pt-2 pb-10">
      <!-- Tabs ภาษา -->
      <van-tabs v-model:active="activeLangTab" type="line" animated color="#202c54">
        <van-tab v-for="lang in langs" :key="lang.code" :name="lang.code" :title="lang.label">
          <!-- หัวเรื่อง + เส้นใต้ -->
          <h2
            class="text-center text-[20px] font-extrabold text-[#202c54] mt-4 relative after:block after:w-28 after:h-[3px] after:bg-[#202c54] after:mx-auto after:mt-2"
          >
            {{ lang.code === 'th'
              ? 'เลือกหน่วยงานของคุณ'
              : lang.code === 'en'
                ? 'Select Your Organization'
                : '选择您的单位'
            }}
          </h2>

          <!-- รายการการ์ดแบบวิทยุ -->
          <div class="flex flex-col gap-3 p-4 mt-2 mb-8">
            <label
              v-for="item in businessModels"
              :key="item.id"
              class="bg-white border rounded-md px-4 py-3 flex items-center gap-3 cursor-pointer transition
                     shadow-[0_1px_0_rgba(0,0,0,0.02)]"
              :class="selectedId === item.id
                ? 'border-[#243a8b] bg-[#eef3ff]'
                : 'border-gray-300 hover:border-[#202c54]/50'"
            >
              <!-- radio -->
              <input
                type="radio"
                class="w-4 h-4 accent-[#243a8b]"
                :value="item.id"
                v-model="selectedId"
                name="business-model"
              />
              <!-- ชื่อหน่วยงาน -->
              <span class="text-[15px] text-[#1f2937]">
                {{ item.name[lang.code] }}
              </span>
            </label>
          </div>
        </van-tab>
      </van-tabs>

      <!-- ปุ่มถัดไป -->
      <div class="max-w-sm w-full mx-auto">
        <Button
          rounded
          :label="t('ถัดไป')"
          class="w-full h-12"
          :pt="{
            root: 'bg-[#243a8b] hover:bg-[#1f2f86] text-white rounded-full active:scale-95 transition'
          }"
          @click="goNext"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ปรับโทนแถบนำทาง (ถ้า LayoutsBaseHeader ใช้ Vant) */
.van-nav-bar{
  --van-nav-bar-background:#0d1a4f;
  --van-nav-bar-text-color:#fff;
  --van-nav-bar-icon-color:#fff;
  --van-nav-bar-title-text-color:#fff;
  --van-nav-bar-height:70px;
}
</style>
