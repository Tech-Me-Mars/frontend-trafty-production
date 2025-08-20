<template>
    <div class="min-h-screen bg-zinc-100">
        <LayoutsBaseHeader :title="t('ใบเตือน')" :showBack="true" />
        <section class="max-w-lg mx-auto pt-0 sm:pt-4">
            <van-tabs v-model:active="activeTab" animated color="#202c54">
                <!-- ใบเตือน -->
                <van-tab :title="t('จัดการใบเตือนแล้ว')" class="pt-5">
                    <div class="px-2">
                        <div v-if="resFinishSurveyWarning.length > 0" v-for="item in resFinishSurveyWarning"
                            :key="item.id" class="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 mb-4">
                            <!-- บรรทัดบน: รูป + ชื่อร้าน + ที่อยู่ -->
                            <div class="flex gap-3 items-start">
                                <img :src="item.ImageProfileURL"
                                    class="rounded-md w-14 h-14 object-cover border border-zinc-200"
                                    :alt="getI18n(item.Business?.shop_name_i18n, locale)" />
                                <div class="flex-1 min-w-0">
                                    <div class="font-bold text-base text-[#202c54] truncate">
                                        {{ getI18n(item.Business?.shop_name_i18n, locale) }}
                                    </div>
                                    <div class="text-zinc-500 text-sm truncate">
                                        {{ formatShopAddress(item.Business) }}
                                    </div>
                                </div>
                            </div>

                            <!-- ข้อความเตือน -->
                            <div class="mt-3 mb-3">
                                <div class="font-semibold text-[#202c54] text-sm mb-0.5">
                                    {{ getI18n(item.warning_title_i18n, locale) }}
                                </div>
                                <div class="text-zinc-500 text-sm">
                                    {{ getI18n(item.warning_details_i18n, locale) }}
                                </div>
                            </div>

                            <!-- ปุ่ม -->
                            <div class="flex gap-2 mt-3">
                                <button @click="navigateTo(`/vendor/warning-list/detail/${item.id}?BusinessId=${route.query.BusinessId}`)"
                                    class="flex-1 border border-[#202c54] text-[#202c54] rounded-lg py-2 transition hover:bg-[#202c54] hover:text-white text-sm font-medium">
                                    {{ t('ดูรายละเอียด') }}
                                </button>
                            </div>
                        </div>
                        <SharedNoData v-else />
                    </div>


                </van-tab>

                <!-- จัดการใบเตือนแล้ว -->
                <!-- ใบเตือน -->
                <van-tab :title="t('ใบเตือน')" class="pt-5">
                    <div class="px-2">
                        <div v-if="resWaitSurveyWarning.length > 0" v-for="item in resWaitSurveyWarning" :key="item.id"
                            class="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 mb-4">
                            <!-- บรรทัดบน: รูป + ชื่อร้าน + ที่อยู่ -->
                            <div class="flex gap-3 items-start">
                                <img :src="item.ImageProfileURL"
                                    class="rounded-md w-14 h-14 object-cover border border-zinc-200"
                                    :alt="getI18n(item.Business?.shop_name_i18n, locale)" />
                                <div class="flex-1 min-w-0">
                                    <div class="font-bold text-base text-[#202c54] truncate">
                                        {{ getI18n(item.Business?.shop_name_i18n, locale) }}
                                    </div>
                                    <div class="text-zinc-500 text-sm truncate">
                                        {{ formatShopAddress(item.Business) }}
                                    </div>
                                </div>
                            </div>

                            <!-- ข้อความเตือน -->
                            <div class="mt-3 mb-3">
                                <div class="font-semibold text-[#202c54] text-sm mb-0.5">
                                    {{ getI18n(item.warning_title_i18n, locale) }}
                                </div>
                                <div class="text-zinc-500 text-sm">
                                    {{ getI18n(item.warning_details_i18n, locale) }}
                                </div>
                            </div>

                            <!-- ปุ่ม -->
                            <div class="flex gap-2 mt-3">
                                <button @click="navigateTo(`/vendor/warning-list/reply/${item.id}?BusinessId=${route.query.BusinessId}`)"
                                    class="flex-1 border border-[#202c54] text-[#202c54] rounded-lg py-2 transition hover:bg-[#202c54] hover:text-white text-sm font-medium">
                                    {{ t('ดูรายละเอียด') }}
                                </button>
                            </div>
                        </div>
                        <SharedNoData v-else />
                    </div>
                </van-tab>
            </van-tabs>


        </section>
    </div>
    <!-- <NotifyMessage v-model:show="toast.show" :type="toast.type" :title="toast.title" :message="toast.message"
        :life="toast.life" />
    <NotificationPopup v-model:visible="notification.visible" :state="notification.state" :title="notification.title"
        :detail="notification.detail" :timeout="notification.timeout" :redirect-url="notification.redirectUrl"
        :auto-close="notification.autoClose" /> -->
</template>
<script setup>
definePageMeta({
    // middleware: ["auth"],
});
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
const route = useRoute()

const activeTab = ref(0)

// mock ข้อมูลใบเตือนที่จัดการแล้ว
const resFinishSurveyWarning = ref([
  {
    id: "1",
    ImageProfileURL: "https://static.naewna.com/uploads/news/source/770058.jpg",
    Business: {
      shop_name_i18n: { th: "ร้านกาแฟพันไทย", en: "Phanthai Cafe" },
      shop_province: { provinces_name_i18n: { th: "กรุงเทพมหานคร", en: "Bangkok" } },
      shop_district: { district_name_i18n: { th: "บางรัก", en: "Bang Rak" } },
      shop_subdistrict: { subdistrict_name_i18n: { th: "สีลม", en: "Silom" } },
    },
    warning_title_i18n: { th: "ความปลอดภัยไม่ผ่าน", en: "Safety Check Failed" },
    warning_details_i18n: { th: "ทางหนีไฟไม่พร้อมใช้งาน", en: "Emergency exit not accessible" },
  },
  {
    id: "2",
    ImageProfileURL: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/b3/6e/a5/caption.jpg?w=900&h=500&s=1",
    Business: {
      shop_name_i18n: { th: "ร่านอาหารครัวบ้านๆ", en: "Homemade Kitchen" },
      shop_province: { provinces_name_i18n: { th: "เชียงใหม่", en: "Chiang Mai" } },
      shop_district: { district_name_i18n: { th: "เมือง", en: "Mueang" } },
      shop_subdistrict: { subdistrict_name_i18n: { th: "สุเทพ", en: "Suthep" } },
    },
    warning_title_i18n: { th: "สุขอนามัยไม่ผ่าน", en: "Hygiene Issues" },
    warning_details_i18n: { th: "พื้นที่ครัวไม่สะอาด", en: "Kitchen area not clean" },
  }
])

// mock ข้อมูลใบเตือนที่ยังไม่จัดการ
const resWaitSurveyWarning = ref([
  {
    id: "3",
    ImageProfileURL: "https://worldspa.com/wp-content/uploads/2024/07/Panoramic-SpaDay.png",
    Business: {
      shop_name_i18n: { th: "สปารีแลกซ์", en: "Relax Spa" },
      shop_province: { provinces_name_i18n: { th: "ภูเก็ต", en: "Phuket" } },
      shop_district: { district_name_i18n: { th: "เมือง", en: "Mueang" } },
      shop_subdistrict: { subdistrict_name_i18n: { th: "ป่าตอง", en: "Patong" } },
    },
    warning_title_i18n: { th: "มาตรฐานความปลอดภัย", en: "Safety Standards" },
    warning_details_i18n: { th: "อุปกรณ์ดับเพลิงไม่เพียงพอ", en: "Insufficient fire extinguishers" },
  }
])

// helper
const formatShopAddress = (b) => {
    if (!b) return ''
    const prov = getI18n(b?.shop_province?.provinces_name_i18n, locale.value)
    const dist = getI18n(b?.shop_district?.district_name_i18n, locale.value)
    const subd = getI18n(b?.shop_subdistrict?.subdistrict_name_i18n, locale.value)
    const parts = [subd && `${t('ตำบล')} ${subd}`, dist && `${t('อำเภอ')} ${dist}`, prov && prov].filter(Boolean)
    return parts.join(' ')
}
</script>
