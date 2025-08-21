<template>
  <div class="max-w-[430px]in-h-screen bg-zinc-100">
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
            <!-- หัวข้อ + หมายเหตุ -->
            <div>
              <span>{{ getI18n(item?.questions_field_name_display, locale) }}</span>
              <p>
                <span class="font-bold">{{ t('หมายเหตุ') }}:</span>
                <span>{{ getI18n(item?.survey_audit_detail_note, locale) }}</span>
              </p>
            </div>
            <!-- ตอบกลับ -->
            <div class="mt-2">
              <span>{{ getI18n(item?.questions_field_name_display, locale) }}</span>
              <p>
                <span class="font-bold">{{ t('ตอบกลับ') }}:</span>
                <span>{{ getI18n(item?.respond_warning_detail_note, locale) }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- รูปตอบกลับ -->
        <div class="flex gap-3 items-start">
          <img
            v-if="item?.respond_warning_detail_img_url"
            :src="item.respond_warning_detail_img_url"
            class="rounded-md w-18 h-14 object-cover border border-zinc-200"
            :alt="t('รูปภาพแนบ')"
          />
        </div>
      </div>

      <SharedNoData v-else />
    </section>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()

/* ---------- MOCK DATA (แทน API) ---------- */
const resList = ref([
  {
    id: 'r-1',
    questions_field_name_display: {
      th: 'ติดตั้งกล้องวงจรปิดให้ครอบคลุมพื้นที่เสี่ยง',
      en: 'Install CCTV to cover risk areas.',
      cn: '在风险区域安装监控。',
    },
    survey_audit_detail_note: {
      th: 'ยังมีมุมอับบริเวณทางเลี้ยว',
      en: 'Blind spot at the corner.',
      cn: '转角处仍有盲区。',
    },
    respond_warning_detail_note: {
      th: 'ติดตั้งกล้องเพิ่มแล้ว 2 จุด และปรับมุมกล้องเดิม',
      en: 'Added 2 cameras and adjusted angles.',
      cn: '已新增2个摄像头并调整原角度。',
    },
    respond_warning_detail_img_url:
      'https://www.sktsecurity.co.th/wp-content/uploads/2023/02/HS-4IN1-T002AA.png',
  },
  {
    id: 'r-2',
    questions_field_name_display: {
      th: 'ป้ายทางออกฉุกเฉินมองเห็นชัดเจนหรือไม่',
      en: 'Are emergency exit signs clearly visible?',
      cn: '紧急出口标识是否清晰可见？',
    },
    survey_audit_detail_note: {
      th: 'สติ๊กเกอร์ซีดจาง',
      en: 'Sticker faded.',
      cn: '贴纸褪色。',
    },
    respond_warning_detail_note: {
      th: 'เปลี่ยนสติ๊กเกอร์ใหม่ทั้งหมดแล้ว',
      en: 'Replaced all stickers.',
      cn: '已全部更换贴纸。',
    },
    respond_warning_detail_img_url:
      'https://static.ajproducts.com/cdn-cgi/image/width=770/globalassets/255048.jpg?ref=F2F3460F56',
  },
  {
    id: 'r-3',
    questions_field_name_display: {
      th: 'ไฟส่องสว่างบริเวณลานจอดรถเพียงพอหรือไม่',
      en: 'Is parking area lighting sufficient?',
      cn: '停车场照明是否充足？',
    },
    survey_audit_detail_note: {
      th: 'ไฟเสีย 2 จุด ใกล้ทางเข้า',
      en: 'Two bulbs broken near the entrance.',
      cn: '入口附近有两处灯泡损坏。',
    },
    respond_warning_detail_note: {
      th: 'ซ่อมแซมและเพิ่มไฟ LED แล้ว',
      en: 'Fixed and added LED lights.',
      cn: '已修复并增加LED灯。',
    },
    respond_warning_detail_img_url:
      'https://www.dohome.co.th/media/amasty/webp/Content/C003_Inspire/CAT003_Home_Appliance/SC078/2ok_jpg.webp',
  },
])

/* ---------- i18n helper ---------- */
const getI18n = (obj, locRef) => {
  if (!obj) return ''
  const loc = typeof locRef === 'string' ? locRef : locRef?.value
  try {
    const o = typeof obj === 'string' ? JSON.parse(obj) : obj
    return o?.[loc] ?? o?.th ?? Object.values(o || {})[0] ?? ''
  } catch {
    return ''
  }
}
</script>
