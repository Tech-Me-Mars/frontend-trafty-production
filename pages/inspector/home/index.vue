<script setup>
definePageMeta({
  middleware: ["auth"],
});
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import widgetMap from "./widgets/widget-map.vue";
import { showToast } from "vant";

const router = useRouter();
const route = useRoute();
const alertToast = ref({});
import * as dataApi from "./api/data.js";

const resDataComon =ref()
const loadDataComon= async ()=>{
    try {
        const res= await dataApi.getNotificationPolice();
        resDataComon.value =res.data.data;
    } catch (error) {
        alertToast.value = {
            title: t('"ล้มเหลว"'),
            isError: true,
            color: "error",
            msg: error.response?.data?.message || "Error occurred",
            dataError: error,
        };
    }
}
onMounted(()=>{
    loadDataComon();
})
const onClick = (title) => {
    // showToast(`คุณคลิกที่ "${title}"`);
};
</script>

<style>
/* Tailwind CSS จะดูแลส่วนของสไตล์ */
</style>
<style scoped>
.van-nav-bar {
    --van-nav-bar-background: #281c74;
    --van-nav-bar-text-color: white;
    --van-nav-bar-icon-color: white;
    --van-nav-bar-title-text-color: white;
    --van-nav-bar-height: 70px
}

.van-cell {
    --van-cell-line-height: 40px;
    --van-cell-text-color: black;
    --van-cell-right-icon-color: black;
}
</style>
<template>
    <div class="bg-zinc-100 min-h-screen">
        <van-nav-bar :title="t('Smart Travel Safety')">
            <template #left>
                <drawer-menu />
            </template>
            <template #right>
                <div class="flex items-center gap-2">
                    <!-- <i class="fa-solid fa-magnifying-glass" style="color: white;font-size: 22px;"></i> -->
                    <div class="border p-0.5 rounded-md w-7 flex justify-center items-center">
                    <i class="fa-regular fa-comment-dots" style="color: white;font-size: 22px;"></i>
                </div>
                </div>
            </template>
        </van-nav-bar>
        <!-- Header -->
        <div class="bg-white">
            <widgetMap />
            

            <div class="flex items-center justify-between mb-4 pt-4">
                <div class="font-bold text-lg">{{ t('การจัดการข้อมูล') }}</div>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-3 gap-4 mb-3">
                <div class="bg-white text-center p-4 border-r-2 cursor-pointer">
                    <div>
                        <div class="text-xl font-bold">{{ resDataComon?.count_waiting_approval }}</div>
                        <div class="text-gray-600 text-sm">{{ t('รออนุมัติ') }}</div>
                    </div>
                </div>
                <div class="bg-white text-center p-4 border-r-2 cursor-pointer">
                    <div>
                        <div class="text-xl font-bold">{{ resDataComon?.count_pass }}</div>
                        <div class="text-gray-600 text-sm">{{ t('อนุมัติแล้ว') }}</div>
                    </div>
                </div>
                <div class="bg-white text-center p-4 cursor-pointer">
                    <div @click="navigateTo('/inspector/send-warning')">
                        <div class="text-xl font-bold">{{ resDataComon?.count_not_pass }}</div>
                        <div class="text-gray-600 text-sm">{{ t('ไม่ผ่านเกณฑ์') }}</div>
                    </div>
                </div>
            </div>

        </div>


        <!-- List Section -->
        <van-cell-group class="!m-0 !p-0">
            <!-- <van-cell :title="t('ระบบจัดเก็บข้อมูล')" is-link >
            </van-cell> -->
            <van-cell :title="t('จัดการแหล่งท่องเที่ยว')" is-link @click="navigateTo('/inspector/list/tourlist')">
                <template #value>
                    <span class="relative" v-if="resDataComon?.notify_tourist>0">
                        <span class="absolute top-0 right-4">
                            <Badge :value="resDataComon?.notify_tourist" severity="danger" class="bg-red-700"></Badge>
                        </span>
                    </span>
                </template>
            </van-cell>
            <van-cell :title="t('จัดการธุรกิจในแหล่งท่องเที่ยว')" is-link @click="navigateTo('/inspector/list/business-tourlist')">
                <template #value>
                    <span class="relative">
                        <span class="absolute top-0 right-4" v-if="resDataComon?.notify_business_tourist>0">
                            <Badge :value="resDataComon?.notify_business_tourist" severity="danger" class="bg-red-700"></Badge>
                        </span>
                    </span>
                </template>
            </van-cell>
            <van-cell :title="t('ตรวจสอบคอมเมนท์')" is-link  />
            <van-cell :title="t('จัดการใบเตือน')" is-link @click="navigateTo('/inspector/warning-list')">
                <template #value>
                    <span class="relative">
                        <span class="absolute top-0 right-4" v-if="resDataComon?.notify_warning>0">
                            <Badge :value="resDataComon?.notify_warning" severity="danger" class="bg-red-700"></Badge>
                        </span>
                    </span>
                </template>
            </van-cell>
        </van-cell-group>
        <MyToast :data="alertToast" />
    </div>
</template>
