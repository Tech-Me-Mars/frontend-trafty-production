<template>
  <div
    class="relative bg-[#101444] text-white px-4 pt-0 pb-3
           flex items-end justify-between h-[80px]"
  >
    <!-- Left -->
    <div class="flex items-end gap-2 min-w-0">
      <img v-if="showIcon" src="/image/logo_erp.png" style="width: 50px;" alt="">
      <button-icon-back v-if="showBack" @click="handleBack" />
      <drawer-menu v-if="showMenu" />
      <slot name="left" />
      <h1 class="text-base font-semibold truncate" v-if="title">{{ title }}</h1>
    </div>

    <!-- Right -->
    <div class="flex items-end">
      <slot name="right" />
      <span class="text-center flex justify-center px-2 py-2" v-if="close" @click="clickClose()">
        <i class="pi pi-times pr-2 cursor-pointer text-lg font-bold" />
      </span>
    </div>

    <!-- เส้นสีด้านล่าง -->
<span
  class="pointer-events-none absolute bottom-0 left-0 right-0 h-[4px]
         bg-gradient-to-r from-orange-400 via-orange-300 yellow-orange-700 to-yellow-300"
/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  title: { type: String, required: true },
  showBack: { type: Boolean, default: false },
  showIcon: { type: Boolean, default: false },
  close: { type: Boolean, default: false },
  backTo: { type: String, default: '' },
  showMenu: { type: Boolean, default: false }
})

const handleBack = () => { props.backTo ? router.push(props.backTo) : router.back() }
const clickClose = () => { props.backTo ? router.push(props.backTo) : router.back() }
</script>
