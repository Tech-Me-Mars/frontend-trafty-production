<template>
  <i @click="drawervisible = true" class="fa-solid fa-bars" style="color: white; font-size: 22px;"></i>

  <Drawer v-model:visible="drawervisible" header="Menu" class="w-64 !bg-zinc-300">
    <template #header>
      <div class="flex items-center gap-2">
        <img src="/image/logo_erp.png" style="width: 50px;" alt="" />
        <span class="font-bold">Menu</span>
      </div>
    </template>

    <ul class="menu-list space-y-4">
      <li v-for="menu in listMenu" :key="menu.id" class="menu-item flex flex-col gap-1 cursor-pointer">
        <!-- Main Level -->
        <div @click="navigateTo(menu.path)" class="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md">
          <i :class="menu.icon"></i>
          <span>{{ menu.label }}</span>
        </div>

        <!-- Sub Level -->
        <ul v-if="menu.items" class="ml-6 space-y-2">
          <li v-for="subItem in menu.items" :key="subItem.label"
            @click="navigateTo(subItem.path), drawervisible = false"
            class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <!-- <i :class="subItem.icon"></i> -->
            <span>{{ subItem.label }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Drawer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const role_id = localStorage.getItem("role_id");
const token = localStorage.getItem("token");
const baseMenu = ref([
  {
    id: 0,
    label: t('หน้าแรก'),
    icon: "",
    path: "/"
  }
]);

const logoutMenu = {
  label: token? t('ออกจากระบบ') : t('เข้าสู่ระบบ'),
  icon: "",
  path: "/auth/login"
};

const listMenu = ref([]);

onMounted(() => {
  conditionAppendMenu();
});

const conditionAppendMenu = async () => {
  try {
    let dynamicMenu = [...baseMenu.value];

    if (role_id == 2) {
      dynamicMenu.push({
        label: t('ธุรกิจของฉัน'),
        icon: "",
        path: "/vendor/my-business"
      });
    } else if (role_id == 3) {
      dynamicMenu.push({
        label: t('ตรวจสอบข้อมูล'),
        icon: "",
        path: "/inspector/home"
      });
    }

    // รวมเมนูทั้งหมด และให้ "ออกจากระบบ" อยู่ล่างสุดเสมอ
    listMenu.value = [...dynamicMenu, logoutMenu];

  } catch (error) {
    console.error(error);
  }
};

const drawervisible = ref(false);

</script>


<style scoped>
.menu-item i {
  color: #281c74;
}

.menu-item:hover i {
  color: #7d6be3;
}
</style>
