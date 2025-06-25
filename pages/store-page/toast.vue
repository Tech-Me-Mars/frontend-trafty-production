<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">ตัวอย่างการใช้งาน NotificationPopup</h2>
      
      <!-- Test Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <van-button 
          type="success" 
          @click="showSuccess"
          class="w-full"
        >
          แสดง Success (Auto Close)
        </van-button>
        
        <van-button 
          type="warning" 
          @click="showWarning"
          class="w-full"
        >
          แสดง Warning (Manual Close)
        </van-button>
        
        <van-button 
          type="danger" 
          @click="showError"
          class="w-full"
        >
          แสดง Error (No Redirect)
        </van-button>
      </div>
  
      <!-- Axios Example -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="font-semibold mb-2">ตัวอย่างการใช้กับ Axios:</h3>
        <van-button 
          type="primary" 
          @click="simulateApiCall"
          :loading="loading"
          class="mb-4"
        >
          {{ loading ? 'กำลังเรียก API...' : 'เรียก API (จำลอง)' }}
        </van-button>
      </div>
  
      <!-- Notification Popup Component -->
      <NotificationPopup
        v-model:visible="notification.visible"
        :state="notification.state"
        :title="notification.title"
        :detail="notification.detail"
        :timeout="notification.timeout"
        :redirect-url="notification.redirectUrl"
        :auto-close="notification.autoClose"
        @close="onNotificationClose"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import axios from 'axios'
//   import NotificationPopup from './NotificationPopup.vue'
  
  // Reactive data
  const loading = ref(false)
  const notification = reactive({
    visible: false,
    state: 'success',
    title: '',
    detail: '',
    timeout: 0,
    redirectUrl: null,
    autoClose: true
  })
  
  // Methods
  const showNotification = (config) => {
    Object.assign(notification, {
      visible: true,
      ...config
    })
  }
  
  const showSuccess = () => {
    showNotification({
      state: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      detail: 'ข้อมูลของคุณได้ถูกบันทึกเรียบร้อยแล้ว',
      timeout: 5000,
      redirectUrl: '/dashboard',
      autoClose: true
    })
  }
  
  const showWarning = () => {
    showNotification({
      state: 'warning',
      title: 'คำเตือน',
      detail: 'กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ กดปุ่มตกลงเพื่อปิด',
      timeout: 0,
      redirectUrl: null,
      autoClose: false // ไม่นับถอยหลัง ต้องกดปุ่มปิด
    })
  }
  
  const showError = () => {
    showNotification({
      state: 'error',
      title: 'เกิดข้อผิดพลาด',
      detail: 'ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง',
      timeout: 4000,
      redirectUrl: null, // ไม่ redirect
      autoClose: true
    })
  }
  
  const simulateApiCall = async () => {
    loading.value = true
    
    try {
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // จำลองความสำเร็จหรือล้มเหลวแบบสุ่ม
      if (Math.random() > 0.5) {
        // Success
        showNotification({
          state: 'success',
          title: 'API เรียกสำเร็จ',
          detail: 'ดึงข้อมูลจากเซิร์ฟเวอร์เรียบร้อยแล้ว',
          timeout: 3000,
          redirectUrl: '/results',
          autoClose: true
        })
      } else {
        // Error
        throw new Error('API Error')
      }
    } catch (error) {
      // Error handling
      showNotification({
        state: 'error',
        title: 'API ล้มเหลว',
        detail: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
        timeout: 4000,
        redirectUrl: null, // ไม่ redirect
        autoClose: true
      })
    } finally {
      loading.value = false
    }
  }
  
  const onNotificationClose = () => {
    console.log('Notification closed')
  }
  
  // ตัวอย่างการใช้งานใน Axios interceptor
  const setupAxiosInterceptors = () => {
    // Request interceptor
    axios.interceptors.request.use(
      config => {
        loading.value = true
        return config
      },
      error => {
        loading.value = false
        return Promise.reject(error)
      }
    )
  
    // Response interceptor
    axios.interceptors.response.use(
      response => {
        loading.value = false
        
        // แสดงการแจ้งเตือนเมื่อสำเร็จ
        showNotification({
          state: 'success',
          title: 'ดำเนินการสำเร็จ',
          detail: 'ข้อมูลได้รับการประมวลผลเรียบร้อยแล้ว',
          timeout: 3000,
          redirectUrl: '/dashboard'
        })
        
        return response
      },
      error => {
        loading.value = false
        
        // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาด
        const errorMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
        
        showNotification({
          state: 'error',
          title: 'เกิดข้อผิดพลาด',
          detail: errorMessage,
          timeout: 5000,
          redirectUrl: '/home'
        })
        
        return Promise.reject(error)
      }
    )
  }
  
  // Initialize axios interceptors on component mount
  setupAxiosInterceptors()
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>