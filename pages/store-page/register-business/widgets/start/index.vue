<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFormStore } from '@/store/businessStore.js'

const { t, setLocale } = useI18n()
onMounted(() => setLocale('th'))

const formStore = useFormStore()

const handleClick = () => {
  formStore.nextPage()
}
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <LayoutsBaseHeader :title="t('ประเภทการให้บริการ')" :showBack="true" backTo="/vendor/my-business" />

    <section class="max-w-md mx-auto px-6 pt-8 pb-12">
      <h1 class="text-center text-2xl font-extrabold text-[#202c54]">
        {{ t('ประเภทการให้บริการ') }}
      </h1>
      <p class="text-center text-gray-500 mt-2">
        {{ t('กรุณาเลือกประเภทการให้บริการของคุณ') }}
      </p>

      <div class="mt-10 flex flex-col items-center space-y-4">
        <Button :label="t('แหล่งท่องเที่ยว')" variant="outlined" rounded class="w-full max-w-xs h-12" :pt="{
          label: {
            class: 'text-primary-main'
          },
          root: {
            class: '!border-primary-main'
          },
        }" @click="handleClick" />
        <Button :label="t('ธุรกิจในแหล่งท่องเที่ยว')" variant="outlined" rounded class="w-full max-w-xs h-12" :pt="{
          label: {
            class: 'text-primary-main'
          },
          root: {
            class: '!border-primary-main'
          },
        }" @click="handleClick" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ถ้าต้องการคุมสี NavBar (ขึ้นกับ LayoutsBaseHeader ของคุณ) */
.van-nav-bar {
  --van-nav-bar-background: #0d1a4f;
  --van-nav-bar-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-height: 70px;
}
</style>
