<template>
  <div class="min-h-screen bg-zinc-50">
    <LayoutsBaseHeader
      :title="t('ใบเตือน')"
      :showBack="true"
      :backTo="goBack()"
    />

    <section class="max-w-lg mx-auto pt-0 sm:pt-4">
      <van-tabs
        v-model:active="activeTab"
        line-width="80"
    
animated swipeable color="#281c74"
      >
        <van-tab :title="t('ใบเตือน')" />
        <van-tab :title="t('จัดการใบเตือนแล้ว')" />
      </van-tabs>

      <!-- Tab Panel 1: ใบเตือน -->
      <div v-if="activeTab === 0" class="px-3 pt-4">
        <div class="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 mb-4">
          <div class="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=72&h=56"
              class="rounded-md w-18 h-14 object-cover border border-zinc-200"
              alt="สถานที่"
            />
            <div class="flex-1 min-w-0">
              <div class="font-bold text-base text-[#202c54] truncate">อุทยานแห่งชาติน้ำตกบัวตอง</div>
              <div class="text-zinc-500 text-sm truncate">ตำบล แม่หอพระ อำเภอแม่แตง เชียงใหม่...</div>
            </div>
          </div>
          <div class="mt-3 mb-3">
            <div class="font-semibold text-[#202c54] text-sm mb-0.5">
              ธุรกิจของคุณ<strong class="font-bold text-red-600">มีใบเตือน</strong>
            </div>
            <div class="text-zinc-500 text-sm">ตามหัวข้อตังนี้...</div>
          </div>
          <div class="flex gap-2 mt-3">
            <!-- <button
              class="flex-1 border border-[#202c54] text-[#202c54] rounded-lg py-2 transition hover:bg-[#202c54] hover:text-white text-sm font-medium"
            >
              ดูรายละเอียด
            </button> -->
              <Button label="ดูรายละเอียด" class="w-full" size="small" outlined></Button>

          </div>
        </div>
      </div>

      <!-- Tab Panel 2: จัดการใบเตือนแล้ว -->
      <div v-if="activeTab === 1" class="px-3 pt-4">
        <div class="text-center text-zinc-400 py-10">ยังไม่มีข้อมูล</div>
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
</script>

