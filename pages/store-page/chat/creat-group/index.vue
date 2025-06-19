<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <LayoutsBaseHeader title="สร้างกลุ่ม" :showBack="false">
      <template #right>
        <button class="text-white text-xl">
          <i class="pi pi-times" />
        </button>
      </template>
    </LayoutsBaseHeader>

    <Form @submit="handleCreateGroup" class="flex-1 px-4 pt-4">
      <!-- Group Name Input -->
      <div class="mb-4">
        <label for="groupName" class="block text-sm font-medium text-gray-700 mb-1">ชื่อกลุ่ม</label>
        <IconField>
          <InputText
            id="groupName"
            v-model="groupName"
            class="w-full pr-10"
            placeholder="ระบุชื่อกลุ่ม"
            :class="{ 'p-invalid': errors.groupName }"
          />
          <InputIcon class="pi pi-plus-circle" />
        </IconField>
        <small class="text-red-500" v-if="errors.groupName">{{ errors.groupName }}</small>
      </div>

      <!-- First Message -->
      <div class="mb-6">
        <label for="firstMessage" class="block text-sm font-medium text-gray-700 mb-1">ข้อความแรก</label>
        <Textarea
          id="firstMessage"
          v-model="firstMessage"
          rows="4"
          autoResize
          class="w-full"
          placeholder="ระบุข้อความแจ้งเตือนหรือประกาศแรกของกลุ่ม"
          :class="{ 'p-invalid': errors.firstMessage }"
        />
        <small class="text-red-500" v-if="errors.firstMessage">{{ errors.firstMessage }}</small>
      </div>

      <!-- Send Button -->
      <div class="px-0 pb-6">
        <Button label="ส่งข้อความ" severity="primary" type="submit" rounded class="w-full" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { Form, useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  groupName: yup.string().required('กรุณาระบุชื่อกลุ่ม'),
  firstMessage: yup.string().required('กรุณาระบุข้อความแรก')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: groupName } = useField('groupName')
const { value: firstMessage } = useField('firstMessage')

const handleCreateGroup = handleSubmit(values => {
//   console.log('Creating group:', values.groupName)
//   console.log('First message:', values.firstMessage)
  // API call or redirect here
})
</script>

<style scoped>
</style>
