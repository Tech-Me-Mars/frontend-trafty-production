<template>
  <div class="min-h-screen bg-white">
    <LayoutsBaseHeader :title="t('แบบตรวจสอบด้านความปลอดภัย')" :showBack="true" />


    <main class="pb-28">
      <!-- การกรอกข้อมูลทั่วไป -->
      <section class="max-w-[420px] mx-auto p-4">
        <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h3 class="text-[13px] font-semibold text-zinc-700 mb-2">
            {{ t('รายละเอียดการตรวจสอบมาตรฐานด้านความปลอดภัยสำหรับสถานที่ท่องเที่ยว') }}
          </h3>

          <!-- หมวด -->
          <div class="text-[13px] text-zinc-600 mb-3">
            {{ t('ประเภทถูดกูป น้ำตก อื่น') }}
          </div>

          <div class="space-y-3">
            <div>
              <label class="form-label">{{ t('สถานที่ท่องเที่ยว') }}</label>
              <InputText v-model="f.place" class="w-full custom-input" />
            </div>

            <div>
              <label class="form-label">{{ t('ภคก') }}</label>
              <InputText v-model="f.pk" class="w-full custom-input" />
            </div>

            <div>
              <label class="form-label">{{ t('กองบังคับการตำรวจท่องเที่ยว') }}</label>
              <InputText v-model="f.division" class="w-full custom-input" />
            </div>

            <div>
              <label class="form-label">{{ t('ครั้งที่') }}</label>
              <InputText v-model="f.round" class="w-full custom-input" />
            </div>

            <div>
              <label class="form-label">{{ t('เจ้าหน้าที่ผู้รับผิดชอบ') }}</label>
              <InputText v-model="f.officer" class="w-full custom-input" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">{{ t('วันที่ตรวจสอบ') }}</label>
                <InputText v-model="f.date" class="w-full custom-input" placeholder="dd/mm/yyyy" />
              </div>
              <div>
                <label class="form-label">{{ t('เวลา') }}</label>
                <InputText v-model="f.time" class="w-full custom-input" placeholder="hh:mm" />
              </div>
            </div>

            <div>
              <label class="form-label">{{ t('สถานประกอบการ') }}</label>
              <InputText v-model="f.org" class="w-full custom-input" />
            </div>
          </div>
        </div>
      </section>

      <!-- คำถาม (mock ให้เหมือนภาพ—ใช้ 2 บล็อกหลัก + 2 บล็อกย่อยรวมเป็น 4 ข้อ) -->
      <section class="max-w-[430px] mx-auto px-4">
        <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h3 class="text-[13px] font-semibold text-zinc-700 mb-3">
            {{ t('รายละเอียดการตรวจสอบมาตรฐานด้านความปลอดภัยสำหรับสถานที่ท่องเที่ยว') }}
          </h3>

          <!-- ๑. ด้านความปลอดภัยในชีวิตและทรัพย์สิน -->
          <div class="mb-4">
            <div class="section-caption">๑. {{ t('ด้านความปลอดภัยในชีวิตและทรัพย์สินของนักท่องเที่ยว') }}</div>
          </div>

          <!-- ๑.๑ -->
          <div class="q-block">
            <p class="q-title">๑.๑ {{ t('มีการจัดเจ้าหน้าที่รักษาความปลอดภัยคอยเฝ้าดูแลนักท่องเที่ยวหรือไม่') }}</p>
            <div class="q-choices">
              <label v-for="(opt,i) in yesNoOptions" :key="'q1-'+i" class="choice-row">
                <RadioButton v-model="q1" :inputId="'q1-'+i" :value="opt.value" />
                <span :for="'q1-'+i">{{ opt.label }}</span>
              </label>
            </div>
            <div class="note-row">
              <span class="note-label">{{ t('หมายเหตุ') }}</span>
              <InputText v-model="q1_note" class="flex-1 custom-input" :placeholder="t('ระบุ')" />
            </div>
          </div>

          <!-- ๑.๒ -->
          <div class="q-block">
            <p class="q-title">๑.๒ {{ t('จัดทำป้ายประชาสัมพันธ์กับพยากรณ์อากาศและสื่อคำเตือนภายในพื้นที่') }}</p>
            <div class="q-choices">
              <label v-for="(opt,i) in yesNoOptions" :key="'q2-'+i" class="choice-row">
                <RadioButton v-model="q2" :inputId="'q2-'+i" :value="opt.value" />
                <span :for="'q2-'+i">{{ opt.label }}</span>
              </label>
            </div>
            <div class="note-row">
              <span class="note-label">{{ t('หมายเหตุ') }}</span>
              <InputText v-model="q2_note" class="flex-1 custom-input" :placeholder="t('ระบุ')" />
            </div>
          </div>

          <!-- ๑.๔ (ความพร้อมปฐมพยาบาล) -->
          <div class="q-block">
            <p class="q-title">๑.๔ {{ t('เจ้าหน้าที่มีความสามารถในการปฐมพยาบาล ความพร้อม อุปกรณ์ปฐมพยาบาลเบื้องต้น') }}</p>
            <div class="q-choices">
              <label v-for="(opt,i) in yesNoOptions" :key="'q3-'+i" class="choice-row">
                <RadioButton v-model="q3" :inputId="'q3-'+i" :value="opt.value" />
                <span :for="'q3-'+i">{{ opt.label }}</span>
              </label>
            </div>
            <div class="note-row">
              <span class="note-label">{{ t('หมายเหตุ') }}</span>
              <InputText v-model="q3_note" class="flex-1 custom-input" :placeholder="t('ระบุ')" />
            </div>
          </div>

          <!-- ๑.๔.๑ (ย่อย) -->
          <div class="q-block">
            <p class="q-title">๑.๔.๑ {{ t('เจ้าหน้าที่มีความพร้อม ผ่านการฝึกอบรมฝึกทักษะ') }}</p>
            <div class="q-choices">
              <label v-for="(opt,i) in yesNoOptions" :key="'q4-'+i" class="choice-row">
                <RadioButton v-model="q4" :inputId="'q4-'+i" :value="opt.value" />
                <span :for="'q4-'+i">{{ opt.label }}</span>
              </label>
            </div>
            <div class="note-row">
              <span class="note-label">{{ t('หมายเหตุ') }}</span>
              <InputText v-model="q4_note" class="flex-1 custom-input" :placeholder="t('ระบุ')" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ปุ่มล่างติดขอบเสมอ -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-sm border-t border-zinc-200"
         :style="{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }">
      <div class="max-w-[420px] mx-auto px-4 pt-2">
        <Button :label="t('ส่งแบบประเมิน')" class="w-full"
                severity="primary" rounded
                :pt="{ root:{ class:'!bg-[#202c54] hover:!bg-[#1b2458] !border-[#202c54] h-11' } }"
                @click="submitMock" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'

const { t } = useI18n()

// ฟอร์มส่วนหัว (mock)
const f = ref({
  place: 'อุทยานน้ำตกผากล้วยไม้',
  pk: 'ตชด. ชุดที่ 31',
  division: 'กองบังคับการตำรวจท่องเที่ยว 1',
  round: '1',
  officer: 'ส.ต.ท. สมชาย ใจดี',
  date: '14/08/2568',
  time: '09:30',
  org: 'ชมรมผู้ประกอบการท่องเที่ยว',
})

// ตัวเลือก
const yesNoOptions = [
  { value: 'yes', label: 'มี/ปฏิบัติ' },
  { value: 'no', label: 'ไม่มี/ไม่ปฏิบัติ' },
  { value: 'none', label: 'ไม่มีรายการ' }
]

// คำถาม (mock)
const q1 = ref('yes'); const q1_note = ref('')
const q2 = ref('no');  const q2_note = ref('')
const q3 = ref('yes'); const q3_note = ref('')
const q4 = ref('');    const q4_note = ref('')

// ปุ่มส่ง (mock)
const submitMock = () => {
  console.log('submit mock', {
    header: f.value, q1: q1.value, q2: q2.value, q3: q3.value, q4: q4.value
  })
}
</script>

<style scoped>
.form-label{ @apply text-[13px] text-zinc-600 block mb-1; }
.custom-input :deep(.p-inputtext){ @apply w-full h-9 rounded-md; }

/* บล็อกคำถามให้โค้ง/เงาเบา ๆ และเว้นระยะเหมือนภาพ */
.q-block{ @apply rounded-md border border-zinc-200 p-3 mb-3; }
.q-title{ @apply text-[13px] text-zinc-800 font-medium mb-2 leading-snug; }
.q-choices{ @apply space-y-1; }
.choice-row{ @apply flex items-center gap-2 text-sm text-zinc-700; }
.note-row{ @apply flex items-center gap-2 mt-2; }
.note-label{ @apply text-sm text-zinc-700; }

/* ปรับเส้นขั้น/ตัวหนังสือเล็ก ให้ mood แบบ mobile form ของภาพ */
.section-caption{ @apply text-[13px] font-semibold text-zinc-700; }
</style>
