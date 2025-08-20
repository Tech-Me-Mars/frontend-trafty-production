<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFormStore } from '@/store/businessStore.js'

const formStore = useFormStore()
const { t, locale, setLocale } = useI18n()

// แท็บภาษา
const langs = [
  { code: 'th', label: 'ภาษาไทย', locale: 'th' },
  { code: 'en', label: 'English', locale: 'en' },
  { code: 'cn', label: '中文', locale: 'cn' }
]
const activeLangTab = ref(0)

onMounted(() => {
  setLocale('th')
})

// sync tab <-> i18n
watch(activeLangTab, (i) => setLocale(langs[i].locale))

// ฟอร์ม (mock ค่าให้เห็นภาพเหมือนตัวอย่าง)
const form = ref({
  business_name: { th: 'ตำรวจท่องเที่ยว', en: '', cn: '' },
  business_person: { th: 'สมชาย ใจดี', en: '', cn: '' },
  business_address: { th: '92/33 หมู่ 8', en: '', cn: '' },
  tambon: { th: 'ห้วยใหญ่', en: '', cn: '' },
  amphoe: { th: 'บางละมุง', en: '', cn: '' },
  province: { th: 'ชลบุรี', en: '', cn: '' },
  zipcode: { th: '73124', en: '', cn: '' },
  business_contact: '0986634474',
  business_email: 'yourname@gmail.com',
  files: []
})

// อัปโหลดไฟล์ (UI เท่านั้น)
const onFileSelect = (event) => {
  event.files?.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => form.value.files.push({ src: e.target.result, file })
    reader.readAsDataURL(file)
  })
}
const removeFile = (i) => form.value.files.splice(i, 1)

// ปุ่มยืนยัน -> ไปหน้าถัดไป (ไม่มีการ submit/api)
const goNext = () => {
  formStore.nextPage()
}
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('ข้อมูลหน่วยงาน')">
      <template #left>
        <ButtonIconBack @click="formStore.prevPage()" />
      </template>
    </LayoutsBaseHeader>

    <section class="max-w-[430px] mx-auto">

      <van-tabs v-model:active="activeLangTab" type="line" color="#202c54" :line-width="100" animated>
        <van-tab v-for="(lang, idx) in langs" :key="lang.code" :title="lang.label" :name="idx">
          <div class="p-3 max-w-md mx-auto">
            <section class="card">
              <h3 class="text-lg font-semibold text-zinc-900 mb-4">{{ t('ข้อมูลหน่วยงาน') }}</h3>

              <!-- ชื่อหน่วยงาน -->
              <div class="field">
                <label class="label">{{ t('ชื่อหน่วยงาน') }}</label>
                <InputText v-model="form.business_name[lang.code]" class="w-full input-underline"
                  :placeholder="t('ชื่อหน่วยงาน')" />
              </div>

              <!-- ผู้รับผิดชอบหลัก -->
              <div class="field">
                <label class="label">{{ t('ชื่อผู้รับผิดชอบหลัก') }}</label>
                <InputText v-model="form.business_person[lang.code]" class="w-full input-underline"
                  :placeholder="t('ชื่อผู้รับผิดชอบ')" />
              </div>

              <!-- เลขที่อยู่ -->
              <div class="field">
                <label class="label">{{ t('เลขที่อยู่') }}</label>
                <InputText v-model="form.business_address[lang.code]" class="w-full input-underline"
                  :placeholder="t('เลขที่/หมู่/ซอย/ถนน')" />
              </div>

              <!-- ตำบล / อำเภอ / จังหวัด / รหัสไปรษณีย์ -->
              <div class="field">
                <label class="label">{{ t('ตำบล/แขวง') }}</label>
                <InputText v-model="form.tambon[lang.code]" class="w-full input-underline"
                  :placeholder="t('ตำบล/แขวง')" />
              </div>

              <div class="field">
                <label class="label">{{ t('อำเภอ/เขต') }}</label>
                <InputText v-model="form.amphoe[lang.code]" class="w-full input-underline"
                  :placeholder="t('อำเภอ/เขต')" />
              </div>

              <div class="field">
                <label class="label">{{ t('จังหวัด') }}</label>
                <InputText v-model="form.province[lang.code]" class="w-full input-underline"
                  :placeholder="t('จังหวัด')" />
              </div>

              <div class="field">
                <label class="label">{{ t('รหัสไปรษณีย์') }}</label>
                <InputText v-model="form.zipcode[lang.code]" class="w-full input-underline"
                  :placeholder="t('รหัสไปรษณีย์')" />
              </div>

              <!-- เบอร์ติดต่อ -->
              <div class="field">
                <label class="label">{{ t('เบอร์ติดต่อ') }}</label>
                <InputText v-model="form.business_contact" class="w-full input-underline"
                  :placeholder="t('เบอร์โทรศัพท์')" />
              </div>

              <!-- อีเมล -->
              <div class="field">
                <label class="label">{{ t('อีเมล') }}</label>
                <InputText v-model="form.business_email" class="w-full input-underline" :placeholder="t('อีเมล')" />
              </div>

              <!-- อัปโหลดไฟล์ -->
              <div class="mt-2">
                <label class="label block mb-1">
                  {{ t('เอกสารรับรองของหน่วยงาน') }}
                </label>

                <!-- บังคับชิดซ้าย -->
                <div class="flex justify-start">
                  <FileUpload mode="basic" customUpload auto :chooseLabel="t('อัพโหลดไฟล์')" chooseIcon="pi pi-upload"
                    class="!w-auto inline-block upload-button" :pt="{
                      root: { class: 'inline-flex' },  // ไม่ยืดเต็มบล็อค
                      chooseButton: { class: '!w-auto px-3 h-10' }
                    }" :ptOptions="{ mergeProps: true }" @select="onFileSelect" />
                </div>

                <ul v-if="form.files.length" class="mt-3 space-y-2">
                  <li v-for="(f, i) in form.files" :key="i"
                    class="flex items-center justify-between bg-zinc-50 rounded-md px-2 py-2">
                    <div class="flex items-center gap-3">
                      <img v-if="f.file?.type?.startsWith('image/')" :src="f.src"
                        class="w-8 h-8 rounded object-cover" />
                      <span class="text-sm text-zinc-700">{{ f.file?.name }}</span>
                    </div>
                    <button type="button" @click="removeFile(i)">
                      <i class="fa-solid fa-xmark text-rose-600" />
                    </button>
                  </li>
                </ul>
              </div>
            </section>

            <!-- ปุ่มยืนยัน -->
            <div class="mt-6 pb-10">
              <Button :label="t('ยืนยัน')" class="w-full" severity="primary" rounded
                :pt="{ root: { class: '!h-12 !rounded-full !text-base' } }" @click="goNext" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-sm border border-zinc-200 p-4;
}

.field+.field {
  @apply mt-2;
}

.label {
  @apply text-sm text-zinc-600;
}

/* อินพุตแบบเส้นใต้ ให้เหมือนในภาพ */
:deep(.input-underline.p-inputtext) {
  border: 0 !important;
  border-bottom: 1px solid rgb(228 228 231) !important;
  /* zinc-200 */
  border-radius: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  background: transparent !important;
}

:deep(.input-underline.p-inputtext:focus) {
  box-shadow: none !important;
  border-bottom-color: #94a3b8 !important;
  /* slate-400 */
}

/* ปุ่มอัปโหลดแบบ Basic ให้หน้าตาเหมือนปุ่มเทาอ่อน */
:deep(.upload-basic .p-button) {
  @apply w-full bg-white border border-zinc-300 text-zinc-600 rounded-lg;
}

:deep(.upload-basic .p-button:hover) {
  @apply bg-zinc-50;
}
</style>
