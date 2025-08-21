<template>
  <div class="min-h-screen bg-zinc-white">
    <LayoutsBaseHeader :title="t('ตอบกลับใบเตือน')" :showBack="true" />
    <!-- แถบเน้นสีเหลืองใต้ header -->


    <section class="max-w-[430px] mx-auto p-3">
      <!-- กล่องข้อเสนอแนะ (กรอบแดง + พื้นอ่อน) -->
<div class="p-3">
        <div class="rounded-sm border border-[#F04438] bg-[#FFF6F6] p-4 mb-5 ">
        <div class="flex items-start gap-2 mb-1">
          <i class="fa-solid fa-comment-dots text-[#F04438] text-base mt-0.5"></i>
          <span class="font-semibold text-gray-800 text-base">
            {{ t('ข้อเสนอแนะเพิ่มเติม') }}
          </span>
        </div>
        <p class="text-sm gray-700 leading-6">
          {{
            t('ขอให้ผู้ประกอบการพิจารณาปรับปรุงการให้บริการแก่นักท่องเที่ยวเพื่อยกระดับคุณภาพและความพึงพอใจของผู้มาใช้บริการ')
          }}
        </p>
      </div>
</div>

      <div class="bg-[#f8f4f4] p-3">
        <!-- หัวข้อใหญ่ -->
      <div class="px-1 mb-3">
        <h1 class="text-[16px] font-semibold text-[#202c54]">
          {{ t('หัวข้อที่ไม่ผ่านเกณฑ์มาตรฐานความปลอดภัย') }}
        </h1>
        <p class="text-[12px] text-zinc-500">
          {{ t('สามารถอัปโหลดรูปภาพได้เพียง 1 รูปต่อข้อ') }}
        </p>
      </div>

      <!-- ฟอร์ม -->
      <Form @submit="handleNext">
        <!-- รายการการ์ด -->
        <div v-for="(item, index) in fields" :key="index"
          class="bg-white rounded-sm border border-zinc-200 shadow-sm p-4 mb-3">
          <!-- หัวการ์ด -->
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-circle-xmark text-red-600 text-lg mt-0.5"></i>
            <div class="flex-1">
              <div class="text-[14px] font-medium text-zinc-800 leading-6">
                {{ getI18n(item.value.questions_field_name_display, locale) }}
              </div>
              <div class="text-[13px] text-zinc-600 mt-1">
                <span class="font-semibold">{{ t('หมายเหตุ') }}:</span>
                <span>
                  {{ getI18n(item.value.survey_audit_detail_note, locale) }}
                </span>
              </div>
            </div>
          </div>

          <!-- ปุ่มแอคชัน -->

          <div class="flex gap-3 mt-2" >
            <InputText v-model="item.value.respond_warning_note_detail" class="w-full" :placeholder="t('ข้อความโน๊ต')"
              :invalid="!!errors[`list_survey[${index}].respond_warning_note_detail`]" />
            <label class="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium
                     border border-primary-main text-primary-main bg-white cursor-pointer hover:bg-[#f7f9ff]">
              <i class="fa-regular fa-images"></i>
              {{ t('เลือก') }}
              <input type="file" accept="image/*" class="hidden" @change="e => onNativeFileSelect(e, index)" />
            </label>
            <!-- <FileUpload mode="basic" accept="image/*" @select="event => onNativeFileSelect(event, index)"
                                customUpload rounded auto severity="secondary" chooseLabel="เลือก"
                                class="rounded-full p-button-outlined border-indigo-900" style="color: rgb(49 46 129);"
                                outlined  chooseIcon="fa-regular fa-images" /> -->

          </div>



          <!-- พรีวิวรูป -->
          <div v-if="item.value.respond_warning_detail_img?.src" class="mt-3 flex flex-wrap gap-2">
            <div class="relative">
              <Image :src="item.value.respond_warning_detail_img.src" alt="preview"
                class="object-cover w-20 h-20 rounded-sm shadow" preview />
              <button type="button" class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow
                       flex items-center justify-center hover:bg-red-100" @click="removeImage(index)">
                <i class="fa-solid fa-xmark text-[12px]"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- ปุ่มบันทึก -->
        <div class="pt-2">
          <Button :loading="isloadingAxi" type="submit" :label="t('ส่งข้อมูล')" class="w-full" rounded />
        </div>
      </Form>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { useFieldArray, useForm, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const isloadingAxi = useState('isloadingAxi', () => false)

/* ---------- VALIDATION (ผ่อนให้ optional เพื่อให้ UI คล้ายภาพ) ---------- */
const validationSchema = toTypedSchema(
  zod.object({
    list_survey: zod.array(
      zod.object({
        respond_warning_note_detail: zod.string().optional().or(zod.literal('')),
      })
    ),
  })
)
const { handleSubmit, errors } = useForm({ validationSchema })
const { push, fields } = useFieldArray('list_survey')

/* ---------- MOCK 3 ROWS (แทน API) ---------- */
onMounted(() => {
  const mocks = [
    {
      id: 'm1',
      q: {
        th: 'มีการจัดเจ้าหน้าที่รักษาความปลอดภัยไว้ดูแลนักท่องเที่ยวอย่างทั่วถึงทั้งก่อนการออกเดินตรวจความพร้อมของผู้มาใช้บริการ',
        en: 'Security staff sufficiently on duty and perform patrol readiness.',
        cn: '安保人员值守并进行巡查。',
      },
      note: {
        th: 'ควรจัดเวรเพิ่มช่วงหัวค่ำ',
        en: 'Add evening shifts.',
        cn: '建议在傍晚增加班次。',
      },
    },
    {
      id: 'm2',
      q: {
        th: 'จัดทำป้ายประชาสัมพันธ์เส้นทางทางออกรวมถึงสัญลักษณ์ตามกฎหมายในพื้นที่',
        en: 'Provide exit route signage and legal symbols.',
        cn: '设置出口路线标识及相关标志。',
      },
      note: {
        th: 'บางจุดมองเห็นไม่ชัด',
        en: 'Some spots are not visible.',
        cn: '部分位置不清晰。',
      },
    },
    {
      id: 'm3',
      q: {
        th: 'ติดตั้งกล้องวงจรปิดให้ครอบคลุมพื้นที่เสี่ยง',
        en: 'Install CCTV to cover risk areas.',
        cn: '在风险区域安装监控。',
      },
      note: {
        th: 'ยังมีมุมอับบริเวณทางเลี้ยว',
        en: 'Blind spot at the corner.',
        cn: '转角处仍有盲区。',
      },
    },
  ]
  mocks.forEach((m) =>
    push({
      survey_warning_respond_details_id: m.id,
      survey_audit_details_id: `audit-${m.id}`,
      questions_field_name_display: m.q,
      survey_audit_detail_note: m.note,
      respond_warning_note_detail: '',
      respond_warning_detail_img: null,
    })
  )
})

/* ---------- ACTIONS ---------- */
const markResolved = (index) => {
  // ตัวอย่าง: เติมข้อความมาตรฐานเมื่อกด "แก้ไขเรียบร้อยแล้ว"
  const f = fields.value[index]
  if (!f) return
  f.value.respond_warning_note_detail = t('แก้ไขเรียบร้อยแล้ว')
}

const onNativeFileSelect = (e, index) => {
  const file = e.target?.files?.[0]
  if (!file || !fields.value[index]) return
  fields.value[index].value.respond_warning_detail_img = {
    src: URL.createObjectURL(file),
    file,
  }
  // reset input เพื่อจะเลือกไฟล์ซ้ำได้
  e.target.value = ''
}

const removeImage = (index) => {
  if (!fields.value[index]) return
  fields.value[index].value.respond_warning_detail_img = null
}

/* ---------- SUBMIT (mock) ---------- */
const handleNext = handleSubmit(async () => {
  isloadingAxi.value = true
  try {
    // สมมติสำเร็จ แล้วพาไปหน้าสำเร็จ
    navigateTo(`/vendor/warning-list/reply/success/?BusinessId=${route.query.BusinessId || ''}`)
  } finally {
    isloadingAxi.value = false
  }
})


</script>

<style scoped>
/* เก็บโทนและโค้งให้เหมือนในภาพ */
</style>
