<template>
  <div class="bg-primary-main text-white px-4 py-3 flex items-center justify-between h-[56px]">
    <!-- Left -->
    <div class="flex items-center gap-2 min-w-0">
      <!-- ปุ่ม back -->
      <button
        v-if="showBack"
        @click="handleBack"
        class="text-white p-0 m-0 text-lg"
      >
        <i class="pi pi-chevron-left pr-2 cursor-pointer text-lg" />
      </button>

      <!-- custom content -->
      <slot name="left" />

      <!-- Default title (optional) -->
      <h1 class="text-base font-semibold truncate" v-if="title">{{ title }}</h1>
    </div>

    <!-- Right -->
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    title: { type: String, required: true },
    showBack: { type: Boolean, default: false }, // ใช้ $router.back()
    backTo: { type: String, default: '' },       // URL ที่จะกลับไปแบบ custom
    showMenu: { type: Boolean, default: false }  // แสดง hamburger แทน back
})

const handleBack = () => {
  if (props.backTo) {
    router.push(props.backTo)
  } else {
    router.back()
  }
}
</script>
