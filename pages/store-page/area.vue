<template>
  <div class="min-h-screen bg-zinc-50">
    <!-- Header -->
    <LayoutsBaseHeader :title="t('พื้นที่ที่รับผิดชอบ')" :showBack="true" :backTo="goBack()" />

    <section class="max-w-lg mx-auto">
      <!-- Tabs -->
      <van-tabs v-model:active="activeTab" line-width="140" class="font-bold text-base" animated swipeable
        color="#202c54">
        <van-tab :title="t('แหล่งท่องเที่ยว')" />
        <van-tab :title="t('ธุรกิจในแหล่งท่องเที่ยว')" />
      </van-tabs>

      <!-- Tab 1: แหล่งท่องเที่ยว -->
      <div v-if="activeTab === 0" class="px-2 pt-5">
        <div v-for="item in attractions" :key="item.id"
          class="bg-white rounded-xl shadow-sm border border-zinc-200 mb-4 p-4">
          <div class="font-bold text-lg text-[#202c54] mb-1">
            {{ item.title }}
          </div>
          <div class="text-zinc-500 text-sm mb-3 truncate">{{ item.desc }}</div>
          <hr class="border-zinc-200 mb-2" />
          <div class="flex gap-2">
            <Button label="ดูรายละเอียด" class="flex-1" size="small" outlined />
            <Button label="ตรวจสอบ" class="flex-1" size="small" outlined />
          </div>
        </div>
      </div>

      <!-- Tab 2: ธุรกิจในแหล่งท่องเที่ยว -->
      <div v-if="activeTab === 1" class="px-2 pt-5">
        <div class="text-center text-zinc-400 py-12">
          ยังไม่มีข้อมูล
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
const t = (txt) => txt

const activeTab = ref(0)
const goBack = () => '/'

// Mock data
const attractions = [
  {
    id: 1,
    title: 'อุทยานแห่งชาติน้ำตกบัวตอง',
    desc: 'ต.แม่หอพระ อ.แม่แตง เชียงใหม่...',
  },
  {
    id: 2,
    title: 'แกรนด์ แคนยอน ศรี',
    desc: 'อ.เมืองชลบุรี จ.ชลบุรี',
  },
  {
    id: 3,
    title: 'หาดบางแสน',
    desc: 'ต.แสนสุข เมืองชลบุรี จ.ชลบุรี',
  },
]
</script>
