<template>
    <div>
      <DatePicker
        v-model="shop_time"
        inputClass="custom-border"
        :dateFormat="'yy-mm-dd'"
        style="width: 10rem;"
        placeholder="yyyy-mm-dd"
      />
      <div class="my-4">
        <span>Raw:</span> {{ shop_time }}
        <br />
        <span>String:</span> {{ shop_timeString }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // v-model ต้องรับ Date/null
  const shop_time = ref(null)
  
  // computed string yyyy-MM-dd
  const shop_timeString = computed(() => {
    if (!shop_time.value) return ''
    const d = shop_time.value
    // ถ้า d เป็น Date
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })
  </script>
  