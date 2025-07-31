<template>
    <div class="min-h-screen bg-zinc-100">
        <!-- Header -->
        <LayoutsBaseHeader :title="('จัดการธุรกิจในแหล่งท่องเที่ยว')" :showBack="true" />

        <!-- Main content -->
        <main class="max-w-lg mx-auto pt-0 sm:pt-4">
            <!-- Section: title + add button -->
            <div class="flex items-center justify-between px-3 pt-4 pb-2 bg-white mb-5">
                <div class="font-bold text-base text-[#202c54]">
                    ธุรกิจในแหล่งท่องเที่ยว <span class="text-xs font-normal text-zinc-400">(2)</span>
                </div>
                <Button label="เพิ่มธุรกิจ" icon="pi pi-plus" rounded outlined @click="onAddBusiness" />
            </div>

            <!-- Business List -->
            <div class="space-y-4 px-3">
                <div v-for="item in businesses" :key="item.id"
                    class="rounded-sm shadow-sm border bg-white p-4">
                    <div class="font-bold text-[#202c54] text-base mb-0.5">{{ item.name }}</div>
                    <div class="text-zinc-500 text-sm mb-3">{{ item.address }}</div>
                    <div class="flex gap-2 mt-1 justify-between w-full">
                        <Button label="ดูรายละเอียด" class="w-full" outlined @click="onView(item)" />
                        <Button label="ไม่แสดงในระบบ" class="w-full" severity="danger" outlined @click="onHide(item)" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

const businesses = ref([
    {
        id: 1,
        name: 'โฮ๊ะจู่',
        address: 'ตำบล แม่หอพระ อำเภอแม่แตง เชียงใหม่...',
    },
    {
        id: 2,
        name: 'ครัวปลาทู (ทิดอ้วน)',
        address: 'อ.เมืองชลบุรี จ.ชลบุรี',
    }
])

const onAddBusiness = () => {
    // handle add business
}
const onView = (item) => {
    // handle view details
}
const onHide = (item) => {
    // handle hide business
}
</script>

<style scoped>
/* เพิ่มเติมปรับปุ่ม PrimeVue ให้อิง Tailwind ได้ตามต้องการ */
</style>
