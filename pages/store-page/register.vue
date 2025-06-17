<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const name = ref('')
const email = ref('')
const username = ref('')
const password = ref('')

const submit = () => {
  console.log({ name: name.value, email: email.value, username: username.value, password: password.value })
}
</script>
<style>
.van-nav-bar {
    --van-nav-bar-background: #281c74;
    --van-nav-bar-text-color: white;
    --van-nav-bar-icon-color: white;
    --van-nav-bar-title-text-color: white;
    --van-nav-bar-height: 70px
}
</style>
<template>
  <div class="min-h-screen bg-zinc pb-24">
        <van-nav-bar title="ลงทะเบียนนักท่องเที่ยว" left-arrow @click-left="router.go(-1)">
        </van-nav-bar>
    <!-- Top bar -->
    <!-- <div class="bg-indigo-900 text-white px-4 py-3 flex items-center space-x-2 relative">
      <span class="text-xl font-bold">←</span>
      <h1 class="text-lg font-semibold">ลงทะเบียนนักท่องเที่ยว</h1>
    </div> -->

    <!-- Tabs -->
    <van-tabs v-model:active="activeTab" line-width="40" color="#1E3A8A" title-active-color="#1E3A8A" class="shadow-sm">
      <van-tab title="นักท่องเที่ยว">
        <!-- Form -->
        <div class="bg-white rounded-lg shadow-sm p-6 mx-4 mt-4 space-y-4">
          <h2 class="text-lg font-bold text-gray-800">ข้อมูลการลงทะเบียน</h2>

          <InputText v-model="name" class="w-full custom-border" placeholder="ชื่อ - นามสกุล" />
          <InputText v-model="email" class="w-full custom-border" placeholder="อีเมล" />
          <InputText v-model="username" class="w-full custom-border" placeholder="ชื่อผู้ใช้งาน" />
          <InputText type="password" v-model="password" class="w-full custom-border" placeholder="รหัสผ่าน" />
        </div>
      </van-tab>

      <van-tab title="ผู้ประกอบการ">
        <div class="p-6 text-center text-gray-500">
          ยังไม่เปิดให้ลงทะเบียนผู้ประกอบการ
        </div>
      </van-tab>
    </van-tabs>

    <!-- Register Button -->
    <div class="flex justify-center mt-4">
        <Button :loading="isloadingAxi" :label="('ลงทะเบียน')" type="submit" severity="primary" rounded class="w-full max-w-md"
                    :pt="{
                        root: {
                            class: '!border-primary-main'
                        },
                    }" />
    </div>
  </div>
</template>
