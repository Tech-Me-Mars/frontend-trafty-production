<template>
    <div class="min-h-screen bg-white">

        <LayoutsBaseHeader :title="t('ธุรกิจในแหล่งท่องเที่ยว')" showBack
            :backTo="`/vendor/manage-business/home/${route.params.id}`"></LayoutsBaseHeader>
        <!-- <div class="p-4 flex justify-end">
            <Button :label="t('เพิ่มรายการสินค้า')" icon="fa-regular fa-square-plus" severity="primary"
                @click="openCreate" />
        </div> -->

        <main>
            <!-- {{ resBusinessAll }} -->
            <div class="p-4 flex-col space-y-3" v-if="resBusinessAll.length > 0">
                <div v-for="(item, index) in resBusinessAll" :key="index"
                    class="border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
                    <div class="p-3">
                        <!-- ชื่อธุรกิจ -->
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-semibold text-gray-800">{{ getI18n(item?.business_list_name_i18n,
                                locale)
                                }}</h2>
                            <p class="text-gray-800 ">฿{{ item?.business_list_price }}</p>
                        </div>
                        <!-- ปุ่มแอคชัน -->
                        <hr class="border-t mt-2 mb-4">
                        <div class="flex  gap-3">
                            <Button :loading="togglingId === item.id" :disabled="isloadingAxi"
                                :label="isFlagTrue(item.status) ? t('ไม่แสดง') : t('แสดง')"
                                :icon="isFlagTrue(item.status) ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                                severity="primary" variant="outlined" class="w-full" @click="showConfirmToggle(item)"
                                :pt="{
                                    label: { class: 'text-primary-main' },
                                    root: { class: '!border-primary-main' },
                                }" />
                            <Button :loading="isloadingAxi" :label="t('แก้ไข')" severity="primary" variant="outlined"
                                class="w-full" @click="openEdit(item)" :pt="{
                                    label: { class: 'text-primary-main' },
                                    root: { class: '!border-primary-main' }
                                }" />

                            <Button :loading="deletingId === item.id" :disabled="isloadingAxi"
                                @click="showConfirmDel(item)" icon="fa-regular fa-trash-can" label="" severity="danger"
                                variant="outlined" class="!w-[10rem]" />
                        </div>
                    </div>
                </div>
            </div>

            <SharedNoData v-else />
        </main>
        <van-action-sheet v-model:show="showEditSheet" :close-on-click-overlay="true" :round="true"
            safe-area-inset-bottom :title="t(isEditMode ? 'แก้ไขรายการ' : 'เพิ่มรายการสินค้า')">
            <div class="p-4">
                <van-tabs v-model:active="activeLangTab" type="line" sticky animated color="#202c54">
                    <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx">
                        <div class="space-y-4 py-2">
                            <div>
                                <label class="label-input block mb-1">{{ t('ชื่อรายการ') }}</label>
                                <InputText v-model="business_list_name_i18n[lang.code]" :placeholder="t('ชื่อรายการ')"
                                    class="w-full custom-border"
                                    :invalid="!!getFieldError('business_list_name_i18n', lang.code)" />
                                <p v-if="getFieldError('business_list_name_i18n', lang.code)" class="error-text">
                                    {{ getFieldError('business_list_name_i18n', lang.code) }}
                                </p>
                            </div>

                            <div>
                                <label class="label-input block mb-1">{{ t('ราคา') }}</label>
                                <InputText v-model="business_list_price" :placeholder="t('ราคา')"
                                    class="w-full custom-border" :invalid="!!errors?.business_list_price" />
                                <p v-if="errors?.business_list_price" class="error-text">
                                    {{ errors?.business_list_price }}
                                </p>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>

                <div class="mt-4 grid grid-cols-2 gap-3">
                    <Button :label="t('ยกเลิก')" severity="secondary" class="w-full" @click="showEditSheet = false" />
                    <Button :loading="isloadingAxi" :label="t('บันทึก')" severity="primary" class="w-full"
                        @click="onSave" />
                </div>
            </div>
        </van-action-sheet>
        <ConfirmDialog></ConfirmDialog>


        <NotifyMessage v-model:show="toast.show" :type="toast.type" :title="toast.title" :message="toast.message"
            :life="toast.life" />
        <NotificationPopup v-model:visible="notification.visible" :state="notification.state"
            :title="notification.title" :detail="notification.detail" :timeout="notification.timeout"
            :redirect-url="notification.redirectUrl" :auto-close="notification.autoClose" />
    </div>
</template>

<script setup>
// basic ที่ใช้ทุกหน้า
definePageMeta({
    middleware: ["auth"],
});
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'

const { t, locale, setLocale } = useI18n()
const isloadingAxi = useState('isloadingAxi')
const route = useRoute()
const router = useRouter()
const confirm1 = useConfirm()

/* ------- helper getI18n (ไม่ยุ่ง UI) ------- */
const getI18n = (val, loc) => {
  try {
    const obj = typeof val === 'string' ? JSON.parse(val) : val
    return obj?.[loc.value] ?? obj?.th ?? Object.values(obj || {})[0] ?? ''
  } catch {
    return ''
  }
}

/* ------- toast & notification (คงของเดิม) ------- */
const toast = ref({
    show: false,
    type: null,
    title: null,
    message: null,
    life: null,
})
const notification = reactive({
    visible: false,
    state: 'success',
    title: '',
    detail: '',
    timeout: 0,
    redirectUrl: null,
    autoClose: true
})
const showNotification = (config) => {
    Object.assign(notification, { visible: true, ...config })
}

/* ================= MOCKUP DATA (2-3 รายการ) ================= */
const resBusinessAll = ref([
  {
    id: 'bl-001',
    business_id: route.params.id,
    business_list_name_i18n: { th: 'กาแฟดริปพิเศษ', en: 'Special Drip Coffee', cn: '手冲咖啡' },
    business_list_price: '95',
    status: true
  },
  {
    id: 'bl-002',
    business_id: route.params.id,
    business_list_name_i18n: { th: 'เค้กช็อกโกแลตเข้มข้น', en: 'Dark Chocolate Cake', cn: '黑巧克力蛋糕' },
    business_list_price: '120',
    status: true
  },
  {
    id: 'bl-003',
    business_id: route.params.id,
    business_list_name_i18n: { th: 'ชามะนาวโซดา', en: 'Lemon Tea Soda', cn: '柠檬茶苏打' },
    business_list_price: '75',
    status: false
  }
])

/* ================= ลบ ================= */
const itemForDelete = ref(null)
const deletingId = ref(null)
const showConfirmDel = (item) => {
  itemForDelete.value = item
  confirm1.require({
    message: `${t('ยืนยันการลบ')}?`,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: t('ยกเลิก'), severity: 'secondary', outlined: true },
    acceptProps: { label: t('ตกลง') },
    accept: async () => {
      deletingId.value = item.id
      // mock ลบตรงๆ ใน list
      resBusinessAll.value = resBusinessAll.value.filter(x => x.id !== item.id)
      deletingId.value = null
      itemForDelete.value = null
    }
  })
}

/* ================= สลับสถานะ แสดง/ไม่แสดง ================= */
const togglingId = ref(null)
const isFlagTrue = (v) => v === true || v === 1 || v === '1' || v === 'true'
const showConfirmToggle = (item) => {
  const isActive = isFlagTrue(item.status)
  confirm1.require({
    message: isActive ? t('ยืนยันการซ่อนรายการนี้ไม่ให้แสดงใช่ไหม?') : t('ยืนยันการแสดงรายการนี้ใช่ไหม?'),
    header: t('ยืนยัน'),
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: t('ยกเลิก'), severity: 'secondary', outlined: true },
    acceptProps: { label: t('ตกลง') },
    accept: async () => {
      togglingId.value = item.id
      // mock toggle
      item.status = !isActive
      setTimeout(() => { togglingId.value = null }, 250)
    }
  })
}

/* ================= สร้าง/แก้ไข (Action Sheet) ================= */
const langs = [
    { code: 'th', label: 'ภาษาไทย', locale: 'th' },
    { code: 'en', label: 'English', locale: 'en' },
    { code: 'cn', label: '中文', locale: 'cn' },
]
const activeLangTab = ref(0)
onMounted(() => setLocale('th'))
watch(activeLangTab, (i) => setLocale(langs[i].locale))
watch(locale, (loc) => {
    const idx = langs.findIndex(l => l.locale === loc)
    if (idx !== -1) activeLangTab.value = idx
})

const validationSchema = toTypedSchema(zod.object({
    business_list_name_i18n: zod.object({
        th: zod.string().min(1, t('กรุณากรอก')),
        en: zod.string().optional().or(zod.literal('')),
        cn: zod.string().optional().or(zod.literal('')),
    }),
    business_list_price: zod.string().nonempty(t('กรุณาระบุข้อมูลราคา')).default(""),
}))
const { handleSubmit, setValues, errors, resetForm } = useForm({
    validationSchema,
    initialValues: {
        business_list_name_i18n: { th: '', en: '', cn: '' },
        business_list_price: '',
    }
})
const isEditMode = computed(() => !!(editingItem.value && editingItem.value.id))
const { value: business_list_name_th } = useField('business_list_name_i18n.th', undefined, { initialValue: '' })
const { value: business_list_name_en } = useField('business_list_name_i18n.en', undefined, { initialValue: '' })
const { value: business_list_name_cn } = useField('business_list_name_i18n.cn', undefined, { initialValue: '' })
const { value: business_list_price }   = useField('business_list_price', undefined, { initialValue: '' })

const business_list_name_i18n = ref({
    get th() { return business_list_name_th.value }, set th(v) { business_list_name_th.value = v },
    get en() { return business_list_name_en.value }, set en(v) { business_list_name_en.value = v },
    get cn() { return business_list_name_cn.value }, set cn(v) { business_list_name_cn.value = v },
})
const getFieldError = (fieldName, langCode = null) => {
    if (langCode) return errors.value[`${fieldName}.${langCode}`] || null
    return errors.value[fieldName] || null
}

const showEditSheet = ref(false)
const editingItem = ref(null)
const prevLocale = ref(null)
const prevActiveLangTab = ref(null)

watch(showEditSheet, (show) => {
    if (!show && prevLocale.value !== null) {
        setLocale(prevLocale.value)
        if (prevActiveLangTab.value != null) activeLangTab.value = prevActiveLangTab.value
        prevLocale.value = null
        prevActiveLangTab.value = null
    }
})

// เปิดแผ่นในโหมด "สร้าง"
const openCreate = () => {
    prevLocale.value = locale.value
    prevActiveLangTab.value = activeLangTab.value
    editingItem.value = null
    setValues({
        business_list_name_i18n: { th: '', en: '', cn: '' },
        business_list_price: '',
    })
    setLocale('th')
    activeLangTab.value = 0
    showEditSheet.value = true
}

// เปิดแผ่นในโหมด "แก้ไข"
const openEdit = (item) => {
    prevLocale.value = locale.value
    prevActiveLangTab.value = activeLangTab.value
    editingItem.value = item
    const i18nData = item?.business_list_name_i18n || { th: '', en: '', cn: '' }
    setValues({
        business_list_name_i18n: i18nData,
        business_list_price: String(item?.business_list_price ?? ''),
    })
    showEditSheet.value = true
}

// บันทึก (mock)
const onSave = handleSubmit(async (values) => {
    if (isEditMode.value) {
        // UPDATE ใน array
        const idx = resBusinessAll.value.findIndex(x => x.id === editingItem.value.id)
        if (idx !== -1) {
            resBusinessAll.value[idx] = {
                ...resBusinessAll.value[idx],
                business_list_name_i18n: values.business_list_name_i18n,
                business_list_price: values.business_list_price,
            }
        }
    } else {
        // CREATE ใน array
        const newItem = {
            id: 'bl-' + Math.random().toString(36).slice(2, 8),
            business_id: route.params.id,
            business_list_name_i18n: values.business_list_name_i18n,
            business_list_price: values.business_list_price,
            status: true
        }
        resBusinessAll.value.unshift(newItem)
    }
    showEditSheet.value = false
    resetForm()
})
</script>

<style scoped>
/* Additional custom styles if needed */
.transition-all {
    transition: all 1s ease-out;
}

.van-tabs__line {
    width: 120px !important;
    background: #281c74 !important;
}

.van-tab {
    --van-tab-active-text-color: #281c74 !important
}
</style>
