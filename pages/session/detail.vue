<script setup>
import { useCookieEncrypt } from '@/composables/useCookieEncrypt'

const numbers = useCookieEncrypt('secureNumbers')
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Detail Page</h1>
    <ul v-if="numbers?.length">
      <li v-for="(n, i) in numbers" :key="i">#{{ i + 1 }}: {{ n }}</li>
    </ul>
    <p v-else class="text-red-500">No data or failed to decrypt.</p>
  </div>
</template>
