<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import { useFormStore } from '@/store/businessStore.js'

const { t, locale, setLocale } = useI18n()
const formStore = useFormStore()
const confirm = useConfirm()

// ภาษาในแท็บ
const langs = [
  { code: 'th', label: 'ภาษาไทย', locale: 'th' },
  { code: 'en', label: 'English', locale: 'en' },
  { code: 'cn', label: '中文', locale: 'cn' },
]
const activeLangTab = ref(0)

onMounted(() => setLocale('th'))
watch(activeLangTab, (i) => setLocale(langs[i].locale))
watch(locale, (newLocale) => {
  const i = langs.findIndex(l => l.locale === newLocale)
  if (i !== -1) activeLangTab.value = i
})

/** ✅ ทำเป็น ref เพื่อให้ splice ได้ */
const mockRows = ref([
  {
    business_list_name_i18n: { th: 'แพ็กเกจดำน้ำตื้น', en: 'Snorkeling package', cn: '浮潜套餐' },
    business_list_price: 1590
  },
  {
    business_list_name_i18n: { th: 'เช่าจักรยาน 1 วัน', en: 'Bike rental (1 day)', cn: '自行车租赁（1天）' },
    business_list_price: 120
  }
])

/** items = ของจริง + mock */
const items = computed(() => {
  const real = Array.isArray(formStore.business_list) ? formStore.business_list : []
  return [...real, ...mockRows.value]
})

/** ✅ ลบรายการจากแหล่งที่ถูกต้อง */
const removeItem = (index) => {
  const real = Array.isArray(formStore.business_list) ? formStore.business_list : []
  const realLen = real.length

  confirm.require({
    message: t('ยืนยันการลบ') + '?',
    header: t('ยืนยัน'),
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: t('ยกเลิก'), severity: 'secondary', outlined: true },
    acceptProps: { label: t('ตกลง') },
    accept: () => {
      if (index < realLen) {
        // ลบจากข้อมูลจริงใน store
        formStore.business_list.splice(index, 1)
      } else {
        // ลบจาก mock
        const mockIndex = index - realLen
        if (mockIndex >= 0 && mockIndex < mockRows.value.length) {
          mockRows.value.splice(mockIndex, 1)
        }
      }
    },
  })
}

// ปุ่มยืนยัน -> ไปหน้าถัดไป
const goNext = () => formStore.nextPage()

// ปุ่มเพิ่มรายการ -> ไปหน้าฟอร์มเพิ่ม
const goAddItem = () => formStore.goToPage(8)

// helper
const showName = (item, langCode) =>
  item?.business_list_name_i18n?.[langCode] ??
  item?.business_list_name_i18n?.th ?? ''

const formatPrice = (val) => {
  if (val == null || val === '') return '-'
  const num = Number(val)
  return isNaN(num) ? String(val) : num.toLocaleString('th-TH', { minimumFractionDigits: 0 })
}
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('รายการธุรกิจในแหล่งท่องเที่ยว')">
      <template #left>
        <ButtonIconBack @click="formStore.prevPage()" />
      </template>
    </LayoutsBaseHeader>

    <div class="max-w-[430px] mx-auto">
      <van-tabs v-model:active="activeLangTab" type="line" sticky line-width="100" animated color="#202c54">
        <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx" class="pt-2">
          <!-- ใส่ padding-bottom กันทับปุ่มล่าง -->
          <div class="p-3" :style="{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 90px)' }">
            <div class="bg-white rounded-sm border border-zinc-200 p-4 shadow-sm">
              <!-- Header -->
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h2 class="font-bold text-lg text-zinc-900">
                    {{ t('ธุรกิจในแหล่งท่องเที่ยว') }}
                  </h2>
                  <p class="text-sm text-zinc-500">{{ t('เพิ่มรายการธุรกิจในแหล่งท่องเที่ยว') }}</p>
                </div>
               
              </div>

              <!-- Empty -->
              <!-- <div v-if="!items.length" class="border border-dashed rounded-sm p-6 text-center text-zinc-500">
                <i class="pi pi-box mb-2 text-2xl block"></i>
                <p class="mb-3">{{ t('ยังไม่มีรายการ') }}</p>
                <Button size="small" icon="pi pi-plus" :label="t('เพิ่มรายการ')" @click="goAddItem" />
              </div> -->

              <!-- List -->
              <div  class="space-y-3">
                <div v-for="(item, index) in items" :key="index"
                  class="flex items-start justify-between rounded-sm border border-zinc-200 p-3.5 hover:border-zinc-300 transition">
                  <div class="pr-3">
                    <p class="font-medium text-zinc-900 leading-tight">
                      {{ showName(item, langs[activeLangTab].code) }}
                    </p>
                    <p class="text-sm text-zinc-700 mt-1">
                      ฿ {{ formatPrice(item.business_list_price) }}
                    </p>
                  </div>

                  <!-- 🔴 ปุ่มลบ “สี่เหลี่ยมแดง” -->
                  <button type="button" class="inline-flex h-4 w-4 !items-center !justify-center rounded-[6px]
         bg-red-700 !text-white shadow-sm hover:bg-red-700 active:scale-95" @click="removeItem(index)"
                    aria-label="remove">
                    <i class="fa-solid fa-xmark text-[12px] leading-none"></i>
                  </button>
                </div>
                 <Button size="small" icon="pi pi-plus" :label="t('เพิ่มรายการ')" severity="secondary"
                  @click="goAddItem" />
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- ✅ ปุ่มบันทึกชิดขอบล่างจอเสมอ -->
    <div class="fixed bottom-0 left-0 right-0 z-30"
      :style="{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }">
      <div class="max-w-[430px] mx-auto px-3 py-2">
        <Button :label="t('บันทึก')" severity="primary" class="w-full " rounded
          :pt="{ root: { class: '!bg-[#202c54] hover:!bg-[#1a255c] !border-[#202c54]' } }" @click="goNext" />
      </div>
    </div>

    <ConfirmDialog />
  </div>
</template>

<style scoped>
/* ปรับโทนให้ดูสะอาด */
</style>
