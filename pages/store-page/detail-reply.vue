<template>
  <div class="min-h-screen bg-zinc-100">
    <LayoutsBaseHeader
      :title="t('ดูรายละเอียดใบเตือน')"
      :showBack="true"
      :BackTo="`/vendor/warning-list?BusinessId=${route.query.BusinessId}`"
    />

    <section class="max-w-lg p-4 mx-auto">
      <div
        v-if="resList.length > 0"
        class="mb-2 card max-w-md px-4"
        v-for="(item, index) in resList"
        :key="index"
      >
        <div class="flex items-start space-x-3 mb-2">
          <i class="fa-solid fa-circle-xmark text-red-600 mt-1"></i>
          <div>
            <div class="mb-1">
              <span>{{ getI18n(item?.questions_field_name_display, locale) }}</span>
              <p>
                <span class="font-bold">{{ t('หมายเหตุ') }}:</span>
                <span>{{ getI18n(item?.survey_audit_detail_note, locale) }}</span>
              </p>
            </div>
            <div>
              <span>{{ getI18n(item?.questions_field_name_display, locale) }}</span>
              <p>
                <span class="font-bold">{{ t('ตอบกลับ') }}:</span>
                <span>{{ getI18n(item?.respond_warning_detail_note, locale) }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-3 items-start">
          <img
            v-if="item?.respond_warning_detail_img_url"
            :src="item?.respond_warning_detail_img_url"
            class="rounded-md w-28 h-20 object-cover border border-zinc-200"
            :alt="getI18n(item?.questions_field_name_display, locale)"
          />
        </div>
      </div>
      <SharedNoData v-else />
    </section>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const route = useRoute();

// ---- MOCK DATA (2 rows) ----
const resList = ref([
  {
    questions_field_name_display: {
      th: "ทางหนีไฟ",
      en: "Emergency Exit",
      cn: "紧急出口",
    },
    survey_audit_detail_note: {
      th: "ประตูถูกล็อค ไม่สามารถเปิดจากด้านใน",
      en: "Door was locked, not openable from inside",
      cn: "门被锁住，无法从内侧打开",
    },
    respond_warning_detail_note: {
      th: "ปลดล็อคแล้ว และติดป้ายทางหนีไฟเรียบร้อย",
      en: "Unlocked and installed exit signage",
      cn: "已解锁并安装紧急出口标识",
    },
    respond_warning_detail_img_url: "https://sunnyemergencylight.com/wp-content/uploads/2024/04/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%AB%E0%B8%99%E0%B8%B5%E0%B9%84%E0%B8%9F%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%90%E0%B8%B2%E0%B8%99-%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%82%E0%B8%A2%E0%B8%98%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9C%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87.webp",
  },
  {
    questions_field_name_display: {
      th: "ถังดับเพลิง",
      en: "Fire Extinguisher",
      cn: "灭火器",
    },
    survey_audit_detail_note: {
      th: "ถังหมดอายุ ไม่มีการตรวจเช็คประจำเดือน",
      en: "Expired and no monthly inspection",
      cn: "已过期且无每月检查记录",
    },
    respond_warning_detail_note: {
      th: "เปลี่ยนถังใหม่แล้ว พร้อมสติ๊กเกอร์ตรวจเช็ค",
      en: "Replaced with new unit and added inspection sticker",
      cn: "已更换新灭火器并贴上检查标签",
    },
    respond_warning_detail_img_url: "https://th.nc-net.com/up/library/89872/88649/f005eb0668b82f0a7fc5233f29f028c2.jpg",
  },
]);

// ไม่มีการเรียก API / ไม่มี submit ใด ๆ — UI เท่านั้น
</script>
