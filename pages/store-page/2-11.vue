<template>
    <div class="min-h-screen bg-zinc-50">
      <LayoutsBaseHeader :title="t('ธุรกิจในแหล่งท่องเที่ยว')" showMenu >
        <template #right>
                <div class="flex items-center gap-2">
                    <div class="border p-0.5 rounded-md w-7 flex justify-center items-center">
                        <i class="fa-regular fa-comment-dots" style="color: white;font-size: 22px;"></i>
                    </div>
                    <div class="border p-0.5 rounded-md w-7 flex justify-center items-center">
                        <van-badge :dot="false">
                            <i
                                class="fa-regular fa-bell" style="color: white;font-size: 22px;"></i>
                        </van-badge>
                    </div>

                </div>

            </template>
        </LayoutsBaseHeader>
  
      <section>
        <!-- Header card -->
        <div class="flex items-center w-full card mb-2">
          <Image
            :src="resBusinessAll.ImageProfileURL"
            alt="Image"
            width="50"
            class="object-cover w-20 h-20"
            :pt="{ image: { class: 'object-cover w-20 h-20 rounded-md shadow-md' } }"
            preview
          />
          <div class="ml-4 flex-1">
            <h2 class="text-lg font-bold">
              {{ getI18n(resBusinessAll.shop_name_i18n, locale) }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ getI18n(resBusinessAll.business_type.business_type_name_i18n, locale) }}
            </p>
  
            <span
              v-if="resBusinessAll.survey_status.survey_success_note"
              class="inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded"
              :style="resBusinessAll.survey_status.bg_color?.startsWith('#') ? { backgroundColor: resBusinessAll.survey_status.bg_color } : {}"
              :class="!resBusinessAll.survey_status.bg_color?.startsWith('#') ? resBusinessAll.survey_status.bg_color : ''"
            >
              <i class="fa-solid fa-circle-exclamation mr-1" />
              {{ getI18n(resBusinessAll.survey_status.survey_success_note, locale) }}
            </span>
          </div>
        </div>
  
        <!-- Progress -->
        <div class="w-full card">
          <h2 class="text-lg font-bold mb-5">{{ t('ข้อมูลธุรกิจในแหล่งท่องเที่ยว') }}</h2>
  
          <div class="flex items-center gap-4 mb-5">
            <van-circle
              v-model:current-rate="currentRate"
              :rate="rate"
              :speed="100"
              :stroke-width="60"
              color="#202c54"
              layer-color="#ebedf0"
              size="60px"
              :text="textRate"
            />
            <div class="flex w-full justify-between">
              <p>{{ t('มาตรฐานความปลอดภัย') }}</p>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
  
          <div class="max-w-xl mx-auto" v-if="resBusinessAll.SurveyAuditCount === 0">
            <Button
              :label="t('เริ่มประเมินมาตรฐานความปลอดภัย')"
              severity="primary"
              rounded
              class="w-full"
              variant="outlined"
              :pt="{ root: { class: '!border-primary-main' } }"
            />
          </div>
        </div>
  
        <!-- Stats -->
        <div class="card border-t grid grid-cols-2 gap-4 mb-3">
          <div class="bg-white text-center p-4 border-r-2">
            <div class="text-xl font-bold">{{ resBusinessAll.BusinessListCount }}</div>
            <div class="text-gray-600 text-sm">{{ t('รายการทั้งหมด') }}</div>
          </div>
          <div class="bg-white text-center p-4">
            <div class="cursor-pointer">
              <div class="text-xl font-bold">{{ resBusinessAll.SurveyWarningCount }}</div>
              <div class="text-gray-600 text-sm">{{ t('ใบเตือน') }}</div>
            </div>
          </div>
        </div>
  
        <!-- Title + ดูทั้งหมด -->
        <div class="flex justify-between items-center px-4">
          <h2 class="text-lg font-bold">{{ t('รายการของฉัน') }}</h2>
          <span class="hover:underline cursor-pointer">
            {{ t('ดูทั้งหมด') }} <i class="fa-solid fa-chevron-right" style="font-size: 14px;"></i>
          </span>
        </div>
  
        <!-- List (mock 3 แถว) -->
        <div class="p-4 flex-col space-y-3">
          <div
            v-for="(item, index) in resBusinessAll.business_list"
            :key="item.id"
            class="border rounded-sm shadow-sm bg-white w-full max-w-md mx-auto"
          >
            <div class="p-3">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800">
                  {{ getI18n(item.business_list_name_i18n, locale) }}
                </h2>
                <p class="text-gray-800">฿{{ item.business_list_price }}</p>
              </div>
  
              <hr class="border-t mt-2 mb-4" />
  
              <div class="flex gap-3">
                <Button
                  :label="isFlagTrue(item.status) ? t('ไม่แสดง') : t('แสดง')"
                  :icon="isFlagTrue(item.status) ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                  severity="primary"
                  variant="outlined"
                  class="w-full"
                  :pt="{ label: { class: 'text-primary-main' }, root: { class: '!border-primary-main' } }"
                  @click="toggleLocal(item)"
                />
                <Button
                  :label="t('แก้ไข')"
                  severity="primary"
                  variant="outlined"
                  class="w-full"
                  :pt="{ label: { class: 'text-primary-main' }, root: { class: '!border-primary-main' } }"
                  @click="openEdit(item)"
                />
                <Button
                  icon="fa-regular fa-trash-can"
                  label=""
                  severity="danger"
                  variant="outlined"
                  class="!w-[10rem]"
                  @click="removeLocal(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- แผ่นแก้ไข (mock) -->
      <van-action-sheet v-model:show="showEditSheet" :round="true" safe-area-inset-bottom :title="t('แก้ไขรายการ')">
        <div class="p-4">
          <van-tabs v-model:active="activeLangTab" type="line" sticky animated color="#202c54">
            <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx">
              <div class="space-y-4 py-2">
                <div>
                  <label class="label-input block mb-1">{{ t('ชื่อรายการ') }}</label>
                  <InputText v-model="editName[lang.code]" :placeholder="t('ชื่อรายการ')" class="w-full custom-border" />
                </div>
                <div>
                  <label class="label-input block mb-1">{{ t('ราคา') }}</label>
                  <InputText v-model="editPrice" :placeholder="t('ราคา')" class="w-full custom-border" />
                </div>
              </div>
            </van-tab>
          </van-tabs>
  
          <div class="mt-4 grid grid-cols-2 gap-3">
            <Button :label="t('ยกเลิก')" severity="secondary" class="w-full" @click="showEditSheet = false" />
            <Button :label="t('บันทึก')" severity="primary" class="w-full" @click="saveLocal" />
          </div>
        </div>
      </van-action-sheet>
    </div>
  </template>
  
  <script setup>
  definePageMeta({ middleware: ['auth'] })
  
  import { ref, computed, watch, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t, locale, setLocale } = useI18n()
  
  /* ---------- helper ---------- */
  const getI18n = (obj, loc) => {
    if (!obj) return ''
    try {
      const o = typeof obj === 'string' ? JSON.parse(obj) : obj
      return o?.[loc.value] ?? o?.th ?? Object.values(o || {})[0] ?? ''
    } catch {
      return ''
    }
  }
  const isFlagTrue = v => v === true || v === 1 || v === '1' || v === 'true'
  
  /* ---------- language tabs ---------- */
  const langs = [
    { code: 'th', label: 'ภาษาไทย', locale: 'th' },
    { code: 'en', label: 'English', locale: 'en' },
    { code: 'cn', label: '中文', locale: 'cn' },
  ]
  const activeLangTab = ref(0)
  onMounted(() => setLocale('th'))
  watch(activeLangTab, i => setLocale(langs[i].locale))
  watch(locale, loc => {
    const idx = langs.findIndex(l => l.locale === loc)
    if (idx !== -1) activeLangTab.value = idx
  })
  
  /* ---------- MOCK DATA ---------- */
  const resBusinessAll = ref({
    ImageProfileURL: 'https://www.okjgroup.com/storage/business-and-brands/ohkajhu/ohkaju-logo.webp',
    shop_name_i18n: { th: 'โอ้ทูริส', en: 'Oh Tourist', cn: '欧途旅' },
    business_type: { business_type_name_i18n: { th: 'ร้านอาหาร', en: 'Restaurant', cn: '餐厅' } },
    survey_status: {
      survey_success_note: { th: 'รออนุมัติ', en: 'Pending', cn: '待审核' },
      bg_color: '#f59e0b'
    },
    score_percent: 0,
    SurveyAuditCount: 0,
    BusinessListCount: 6,
    SurveyWarningCount: 0,
    business_list: [
      {
        id: 'bl-1',
        business_list_name_i18n: { th: 'สเต็กทีโบนสเต๊กพานิช', en: 'T-bone Steak', cn: 'T骨牛排' },
        business_list_price: '8250 - 400',
        status: true
      },
      {
        id: 'bl-2',
        business_list_name_i18n: { th: 'เช่ารถพุ่งภูมิวิศว', en: 'SUV Rental', cn: 'SUV租赁' },
        business_list_price: '3300 - 800',
        status: true
      },
      {
        id: 'bl-3',
        business_list_name_i18n: { th: 'โจ๊กธูชิศาลด', en: 'Congee bowl', cn: '粥' },
        business_list_price: '880',
        status: false
      }
    ]
  })
  
  /* ---------- progress circle ---------- */
  const currentRate = ref(0)
  const rate = ref(resBusinessAll.value.score_percent)
  const textRate = computed(() => `${currentRate.value.toFixed(0)}%`)
  onMounted(() => {
    // นิดๆหน่อยๆให้ anim ดูมีชีวิต
    requestAnimationFrame(() => (currentRate.value = rate.value))
  })
  
  /* ---------- local actions (no API) ---------- */
  const toggleLocal = (item) => {
    item.status = !isFlagTrue(item.status)
  }
  const removeLocal = (index) => {
    resBusinessAll.value.business_list.splice(index, 1)
  }
  
  /* ---------- edit sheet (mock) ---------- */
  const showEditSheet = ref(false)
  const editingItem = ref(null)
  const editName = ref({ th: '', en: '', cn: '' })
  const editPrice = ref('')
  
  const openEdit = (item) => {
    editingItem.value = item
    editName.value = { ...(item.business_list_name_i18n || { th: '', en: '', cn: '' }) }
    editPrice.value = String(item.business_list_price ?? '')
    showEditSheet.value = true
  }
  
  const saveLocal = () => {
    if (!editingItem.value) return
    editingItem.value.business_list_name_i18n = { ...editName.value }
    editingItem.value.business_list_price = editPrice.value
    showEditSheet.value = false
  }
  
  /* ---------- misc ---------- */
  const isloadingAxi = useState('isloadingAxi')
  </script>
  
  <style scoped>
  .card { @apply bg-white border border-zinc-200 p-4; }
  .label-input { @apply text-sm text-zinc-600; }
  .custom-border :deep(.p-inputtext), :deep(.p-dropdown) { @apply w-full; }
  </style>
  