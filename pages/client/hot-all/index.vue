<style scoped>
.van-nav-bar {
    --van-nav-bar-background: #281c74;
    --van-nav-bar-text-color: white;
    --van-nav-bar-icon-color: white;
    --van-nav-bar-title-text-color: white;
    --van-nav-bar-height: 70px
}
</style>
<template>
    <div class="bg-zinc-100 min-h-screen">
                    <LayoutsBaseHeader :title="t('กำลังเป็นที่นิยม')" :showBack="true" back-to="/">
        </LayoutsBaseHeader>

        <section class="p-4">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                v-if="resHotAll.length > 0">
                <div v-for="(place, index) in resHotAll" :key="index"
                    class="relative group bg-white rounded-lg shadow-lg overflow-hidden">
                    <NuxtLink :to="`/client/information/${place.id}`">
                        <img :src="place.image_cover" :alt="place.shop_name"
                            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                    </NuxtLink>
                    <div
                        class="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent p-2 w-full">
                        <h3 class="text-white text-sm font-bold">{{ place.shop_name }}</h3>
                        <p class="text-white text-xs">{{ place.business_address }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-64  p-6">
                <i class="fa-solid fa-circle-exclamation text-red-500 text-5xl mb-3"></i>
                <h2 class="text-gray-700 text-lg font-semibold">{{ t('ไม่พบข้อมูล') }}</h2>
                <p class="text-gray-500 text-sm">{{ t('ลองค้นหาใหม่หรือกลับไปหน้าหลัก') }}</p>
            </div>
        </section>
    </div>



</template>

<script setup>
// definePageMeta({
//     middleware: ["auth"],
// });
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import * as dataApi from './api/data.js'

const route = useRoute();
const resHotAll = ref([])
const loadCategory = async () => {
    try {
        const res = await dataApi.getHotAll();
        resHotAll.value = res.data.data;
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    loadCategory();
})
</script>