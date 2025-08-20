<template>
    <!--ไอคอนเปิด Drawer-->
    <i @click="drawervisible = true" class="fa-solid fa-bars" style="color: white; font-size: 22px;"></i>
  
    <Drawer v-model:visible="drawervisible" :dismissable="true" position="left" class="w-72">
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <img src="/image/logo_erp.png" style="width: 42px;" alt="logo" />
            <span class="font-bold text-[#0f1b44]">Menu</span>
          </div>
          <button class="text-2xl text-[#0f1b44]" @click="drawervisible = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </template>
  
      <!-- Menu list -->
      <nav class="pt-2">
        <ul class="space-y-1">
          <li v-for="(m, idx) in listMenu" :key="m.key || idx">
            <!-- divider -->
            <hr v-if="m.divider" class="my-2 border-zinc-200" />
  
            <!-- item -->
            <button
              v-else
              type="button"
              class="w-full text-left px-3 py-3 rounded-md text-[16px] text-[#0f1b44] hover:bg-zinc-100"
              @click="onItemClick(m)"
            >
              <div class="flex items-center gap-3">
                <i v-if="m.icon" :class="m.icon"></i>
                <span>{{ m.label }}</span>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </Drawer>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  const drawervisible = ref(false)
  
  // ---- state จาก localStorage ----
  const roleId = ref(Number(localStorage.getItem('role_id') || '0'))
  const token = ref(localStorage.getItem('token') || '')
  
  // base item
  const homeItem = computed(() => ({
    key: 'home',
    label: t('หน้าแรก'),
    path: '/',
    icon: ''
  }))
  
  // เมนูตาม role
  const roleMenus = computed(() => {
    if (roleId.value === 2) {
      // ผู้ประกอบการ (ตามภาพตัวอย่าง)
      return [
        { key: 'mybiz',  label: t('ธุรกิจของฉัน'),            path: '/vendor/my-business' },
        { key: 'reply',  label: t('ตอบกลับใบเตือน'),         path: '/vendor/warning-list' },
        { key: 'divider1', divider: true },
        { key: 'editbiz', label: t('แก้ไขโปรไฟล์ธุรกิจ'),     path: '/vendor/my-business/edit-profile' },
      ]
    } else if (roleId.value === 3) {
      // ผู้ตรวจ (ตัวอย่างเดิมของคุณ)
      return [
        { key: 'inspect', label: t('ตรวจสอบข้อมูล'), path: '/inspector/home' }
      ]
    }
    return []
  })
  
  // ปุ่มล่างสุด: เข้าสู่ระบบ/ออกจากระบบ
  const authItem = computed(() => {
    if (token.value) {
      return { key: 'logout', label: t('ออกจากระบบ'), action: 'logout' }
    }
    return { key: 'login', label: t('เข้าสู่ระบบ'), path: '/auth/login' }
  })
  
  // รวมเมนูทั้งหมด (home + role + divider + auth)
  const listMenu = computed(() => {
    const items = [homeItem.value, ...roleMenus.value]
    // ให้มีเส้นคั่นก่อนปุ่มท้ายเสมอ ถ้าอันสุดท้ายไม่ใช่ divider อยู่แล้ว
    if (!items.at(-1)?.divider) items.push({ key: 'divider_auth', divider: true })
    items.push(authItem.value)
    return items
  })
  
  const onItemClick = (m) => {
    if (m.action === 'logout') {
      // ล็อกเอาท์
      try {
        localStorage.removeItem('token')
        // ถ้าคุณเก็บ role_id ตาม token ให้เคลียร์ด้วย
        // localStorage.removeItem('role_id')
        token.value = ''
        // ไปหน้าล็อกอิน
        navigateTo('/auth/login')
      } finally {
        drawervisible.value = false
      }
      return
    }
  
    if (m.path) {
      navigateTo(m.path)
    }
    drawervisible.value = false
  }
  </script>
  
  <style scoped>
  /* โทนสีตัวอักษร/hover ให้ใกล้กับตัวอย่าง */
  </style>
  