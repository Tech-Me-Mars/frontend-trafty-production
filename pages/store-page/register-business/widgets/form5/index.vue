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
  { code: 'en', label: 'English',  locale: 'en' },
  { code: 'cn', label: '中文',       locale: 'cn' },
]
const activeLangTab = ref(0)

onMounted(() => setLocale('th'))
watch(activeLangTab, (i) => setLocale(langs[i].locale))
watch(locale, (newLocale) => {
  const i = langs.findIndex(l => l.locale === newLocale)
  if (i !== -1) activeLangTab.value = i
})

// แหล่งข้อมูล (มาจาก Pinia)
const mockRows = [
  {
    business_list_name_i18n: { th: 'แพ็กเกจดำน้ำตื้น', en: 'Snorkeling package', cn: '浮潜套餐' },
    business_list_price: 1590
  },
  {
    business_list_name_i18n: { th: 'เช่าจักรยาน 1 วัน', en: 'Bike rental (1 day)', cn: '自行车租赁（1天）' },
    business_list_price: 120
  }
]

// items = ของจริง + mock (ถ้า business_list ว่าง ก็ได้แค่ mock)
const items = computed(() => {
  const real = Array.isArray(formStore.business_list) ? formStore.business_list : []
  return [...real, ...mockRows]
})

// ลบรายการพร้อมยืนยัน
const removeItem = (index) => {
  confirm.require({
    message: t('ยืนยันการลบ') + '?',
    header: t('ยืนยัน'),
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: t('ยกเลิก'), severity: 'secondary', outlined: true },
    acceptProps: { label: t('ตกลง') },
    accept: () => { formStore.business_list.splice(index, 1) },
  })
}

// ปุ่มยืนยัน -> ไปหน้าถัดไป
const goNext = () => formStore.nextPage()

// ปุ่มเพิ่มรายการ -> ไปหน้าฟอร์มเพิ่ม
const goAddItem = () => formStore.goToPage(8)

// helper
const showName = (item, langCode) =>
  item?.business_list_name_i18n?.[langCode] ??
  item?.business_list_name_i18n?.th ??
  ''

const formatPrice = (val) => {
  if (val == null || val === '') return '-'
  const num = Number(val)
  return isNaN(num) ? String(val) : num.toLocaleString('th-TH', { minimumFractionDigits: 0 })
}
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('รายการธุรกิจในแหล่งท่องเที่ยว')">
      <template #left><ButtonIconBack @click="formStore.prevPage()" /></template>
    </LayoutsBaseHeader>

    <div class="max-w-2xl mx-auto p-4">
      <van-tabs
        v-model:active="activeLangTab"
        type="line"
        sticky
        animated
        color="#202c54"
      >
        <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx" class="pt-2">
          <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <div>
                <h2 class="font-bold text-lg text-zinc-900">
                  {{ t('ธุรกิจในแหล่งท่องเที่ยว') }}
                </h2>
                <p class="text-sm text-zinc-500">{{ t('เพิ่มรายการสินค้า') }}</p>
              </div>
              <Button
                size="small"
                icon="pi pi-plus"
                :label="t('เพิ่มรายการ')"
                severity="secondary"
                @click="goAddItem"
              />
            </div>

            <!-- Empty state -->
            <div
              v-if="!items.length"
              class="border border-dashed rounded-xl p-6 text-center text-zinc-500"
            >
              <i class="pi pi-box mb-2 text-2xl block"></i>
              <p class="mb-3">{{ t('ยังไม่มีรายการ') }}</p>
              <Button size="small" icon="pi pi-plus" :label="t('เพิ่มรายการ')" @click="goAddItem" />
            </div>

            <!-- List -->
            <div v-else class="space-y-3">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="flex items-start justify-between rounded-lg border border-zinc-200 p-3 hover:border-zinc-300 transition"
              >
                <div class="pr-3">
                  <p class="font-medium text-zinc-800">
                    {{ showName(item, langs[activeLangTab].code) }}
                  </p>
                  <p class="text-sm text-zinc-500 mt-1">
                    ฿ {{ formatPrice(item.business_list_price) }}
                  </p>
                </div>
                <button
                  type="button"
                  class="text-rose-600 hover:text-rose-700"
                  @click="removeItem(index)"
                  aria-label="remove"
                >
                  <i class="fa-solid fa-circle-xmark text-xl"></i>
                </button>
              </div>
            </div>

            <!-- Footer action -->
            <div class="pt-5">
              <Button
                :label="t('ยืนยัน')"
                severity="primary"
                rounded
                class="w-full"
                :pt="{ root: { class: '!border-primary-main' } }"
                @click="goNext"
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- Confirm ลบ -->
    <ConfirmDialog />
  </div>
</template>

<style scoped>
/* ปรับโทนให้ดูสะอาด */
</style>
