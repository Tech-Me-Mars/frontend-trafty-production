<script setup>
import { useRouter } from 'vue-router'
import { useCookieEncrypt } from '@/composables/useCookieEncrypt'

const router = useRouter()

const secureCookie = useCookieEncrypt('secureNumbers', {
  maxAge: 60 * 10,
})

const generate = () => {
  const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000))
  secureCookie.value = numbers
  router.push('/session/detail')
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Main Page</h1>
    <button @click="generate" class="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
  </div>
</template>
