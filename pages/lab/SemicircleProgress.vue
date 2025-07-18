<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <div class="bg-blue-900 text-white p-4">
            <div class="flex items-center">
                <van-icon name="arrow-left" size="20" class="mr-3" @click="goBack" />
                <h1 class="text-lg font-medium">มาตรฐานความปลอดภัย</h1>
            </div>
        </div>

        <!-- Main Content -->
        <div class="px-4 py-6">
            <!-- Status Header -->
            <div class="text-center mb-8">
                <p class="text-gray-600 text-sm mb-2">การประเมินองคุณ</p>
                <h2 class="text-xl font-semibold text-gray-800">ค่อนข้างดี</h2>
            </div>

            <!-- Progress Circle -->
            <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <h3 class="text-lg font-medium mb-4">ประเภทรับอาหาร</h3>

                <div class="flex justify-center mb-6">
                    <!-- Gauge Component -->
                    <div class="relative size-40">
                        <svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                            <!-- Background Circle (Gauge) -->
                            <circle cx="18" cy="18" r="16" fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1"
                                stroke-dasharray="50 100" stroke-linecap="round"></circle>

                            <!-- Gauge Progress -->
                            <circle cx="18" cy="18" r="16" fill="none"
                                class="stroke-current text-blue-600 dark:text-blue-500" stroke-width="1.5"
                                stroke-dasharray="37.5 100" stroke-linecap="round"></circle>
                        </svg>

                        <!-- Value Text -->
                        <div class="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
                            <span class="text-3xl font-bold text-blue-600 dark:text-blue-500">75</span>
                            <span class="text-sm text-blue-600 dark:text-blue-500 block">Score</span>
                        </div>
                    </div>
                    <!-- End Gauge Component -->
                    <!-- <div class="relative">
     
              <svg class="w-32 h-20" viewBox="0 0 120 60">
  
                <path
                  d="M 10 50 A 40 40 0 0 1 110 50"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="8"
                  stroke-linecap="round"
                />
       
                <path
                  d="M 10 50 A 40 40 0 0 1 110 50"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${semiCircumference} ${semiCircumference}`"
                  :stroke-dashoffset="semiCircumference - (progress / 100) * semiCircumference"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>

              <div class="absolute inset-0 flex items-center justify-center pt-4">
                <span class="text-3xl font-bold text-gray-800">{{ progress }}%</span>
              </div>
            </div> -->
                </div>

                <!-- Tab Navigation -->
                <div class="flex border-b border-gray-200 mb-4">
                    <button
                        class="flex-1 py-2 text-center text-sm font-medium border-b-2 border-blue-500 text-blue-600">
                        อยู่ในเกณฑ์ดี
                    </button>
                    <button class="flex-1 py-2 text-center text-sm font-medium text-gray-500">
                        ต้องปรับปรุง
                    </button>
                </div>
            </div>

            <!-- Assessment Details -->
            <div class="space-y-4">
                <!-- Item 1 -->
                <div class="bg-white rounded-lg p-4 shadow-sm">
                    <h4 class="font-medium text-gray-800 mb-3">
                        1. ด้านความปลอดภัยในชีวิตและทรัพย์สินของนักท่องเที่ยว
                    </h4>
                    <p class="text-sm text-gray-600 mb-3">
                        มีการจัดเจ้าหน้าที่รักษาความปลอดภัยไว้ตลอดเวลาก่อนหน้า
                        ยังช่วงเวลาเก็บ มีการออกเดินตรวจความ
                    </p>
                    <p class="text-sm text-gray-600">
                        เรียบร้อยอยู่สม่ำเสมอ
                    </p>
                </div>

                <!-- Item 2 -->
                <div class="bg-white rounded-lg p-4 shadow-sm">
                    <p class="text-sm text-gray-600">
                        มีการติดตั้งกล้องวงจรปิด สามารถใช้ได้อย่างและ
                        ตรวจสอบย้อนหลัง หลังได้
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data
const progress = ref(0)
const targetProgress = 100
const semiCircumference = Math.PI * 40 // radius = 40 for semi-circle

// Methods
const goBack = () => {
    // Handle back navigation
    console.log('Going back...')
}

// Animate progress on mount
onMounted(() => {
    setTimeout(() => {
        progress.value = targetProgress
    }, 300)
})
</script>

<style scoped>
/* Additional custom styles if needed */
.transition-all {
    transition: all 1s ease-out;
}
</style>