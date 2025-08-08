<template>
    <div class="min-h-screen bg-white">

        <LayoutsBaseHeader title="ตรวจสอบคอมเม้นต์" :showBack="true">
        </LayoutsBaseHeader>

  <div class="space-y-8 max-w-xl mx-auto bg-white p-6 rounded-lg ">

    <!-- Block 1 -->
    <div>
      <div class="font-medium text-gray-900 mb-2">
        ๑.๔ เจ้าหน้าที่มีความสามารถในการปฐมพยาบาล ความพร้อม อุปกรณ์ปฐมพยาบาลเบื้องต้น
      </div>
      <div class="flex flex-col gap-1">
        <div v-for="(item, idx) in yesNoOptions" :key="idx" class="flex items-center gap-2">
          <RadioButton v-model="q1" :inputId="`q1-${idx}`" :value="item.value" />
          <label :for="`q1-${idx}`" class="text-gray-700 text-sm">{{ item.label }}</label>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-700 text-sm">หมายเหตุ</span>
          <InputText v-model="q1_note" class="" placeholder="ระบุ" />
        </div>
      </div>
    </div>

    <!-- Block 2 -->
    <div>
      <div class="font-medium text-gray-900 mb-2">
        ๑.๔.๑ เจ้าหน้าที่มีความพร้อม ผ่านการฝึกอบรมฝึกทักษะ
      </div>
      <div class="flex flex-col gap-1">
        <div v-for="(item, idx) in yesNoOptions" :key="idx" class="flex items-center gap-2">
          <RadioButton v-model="q2" :inputId="`q2-${idx}`" :value="item.value" />
          <label :for="`q2-${idx}`" class="text-gray-700 text-sm">{{ item.label }}</label>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-700 text-sm">หมายเหตุ</span>
          <InputText v-model="q2_note" class="" placeholder="ระบุ" />
        </div>
      </div>
    </div>

    <!-- Block 3 -->
    <div>
      <div class="font-medium text-gray-900 mb-2">
        ๑.๔.๒ มีอุปกรณ์ เครื่องมือ พร้อมใช้งาน
      </div>
      <div class="flex flex-col gap-1">
        <div v-for="(item, idx) in yesNoOptions" :key="idx" class="flex items-center gap-2">
          <RadioButton v-model="q3" :inputId="`q3-${idx}`" :value="item.value" />
          <label :for="`q3-${idx}`" class="text-gray-700 text-sm">{{ item.label }}</label>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-700 text-sm">หมายเหตุ</span>
          <InputText v-model="q3_note" class="" placeholder="ระบุ" />
        </div>
      </div>
    </div>

    <!-- Block 4 -->
    <div>
      <div class="font-medium text-gray-900 mb-2">
        ๑.๔ การจัดทำแผนเผชิญเหตุและมีการซักซ้อมปีละ ๑ ครั้ง
      </div>
      <div class="flex flex-col gap-1">
        <div v-for="(item, idx) in yesNoOptions" :key="idx" class="flex items-center gap-2">
          <RadioButton v-model="q4" :inputId="`q4-${idx}`" :value="item.value" />
          <label :for="`q4-${idx}`" class="text-gray-700 text-sm">{{ item.label }}</label>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-700 text-sm">หมายเหตุ</span>
          <InputText v-model="q4_note" class="" placeholder="ระบุ" />
        </div>
      </div>
    </div>

  </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'

const yesNoOptions = [
  { value: 'yes', label: 'มี/ปฏิบัติ' },
  { value: 'no', label: 'ไม่มี / ไม่ปฏิบัติ' },
  { value: 'none', label: 'ไม่มีรายการนี้' },
]

const q1 = ref('')
const q1_note = ref('')
const q2 = ref('')
const q2_note = ref('')
const q3 = ref('')
const q3_note = ref('')
const q4 = ref('')
const q4_note = ref('')
</script>

<style scoped>
/* เพิ่ม custom style ได้ถ้าต้องการ */
</style>