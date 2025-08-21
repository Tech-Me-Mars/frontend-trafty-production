<template>
  <div class="min-h-screen bg-zinc-100">
    <LayoutsBaseHeader :title="t('ใบเตือน')" :showBack="true" />

    <section class="max-w-[430px] mx-auto">
      <van-tabs v-model:active="activeTab" :line-width="100" animated color="#202c54">
        <!-- จัดการใบเตือนแล้ว -->
        <van-tab :title="t('จัดการใบเตือนแล้ว')" class="">
          <div class="p-3">
            <div v-if="resFinishSurveyWarning.length > 0" v-for="item in resFinishSurveyWarning" :key="item.id"
              class="bg-white rounded-sm shadow-sm border border-zinc-200 p-4 mb-4">
              <!-- บรรทัดบน: รูป + ชื่อร้าน + ที่อยู่ -->
              <div class="flex gap-3 items-start">
                <img :src="item.ImageProfileURL" class="rounded-sm w-14 h-14 object-cover border border-zinc-200"
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
                <Button outlined class="w-full" :pt="{
                  label: {
                    class: 'text-primary-main'
                  },
                  root: {
                    class: '!border-primary-main'
                  },

                }">
                  {{ t('ดูรายละเอียด') }}
                </Button>
              </div>
            </div>
            <SharedNoData v-else />
          </div>
        </van-tab>

        <!-- ใบเตือน (รอจัดการ) -->
        <van-tab :title="t('ใบเตือน')" class="pt-5">
          <div class="px-2">
            <div v-if="resWaitSurveyWarning.length > 0" v-for="item in resWaitSurveyWarning" :key="item.id"
              class="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 mb-4">
              <!-- บรรทัดบน: รูป + ชื่อร้าน + ที่อยู่ -->
              <div class="flex gap-3 items-start">
                <img :src="item.ImageProfileURL" class="rounded-md w-18 h-14 object-cover border border-zinc-200"
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
                <Button outlined class="w-full" :pt="{
                  label: {
                    class: 'text-primary-main'
                  },
                  root: {
                    class: '!border-primary-main'
                  },

                }">
                  {{ t('ดูรายละเอียด') }}
                </Button>
              </div>
            </div>
            <SharedNoData v-else />
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>

  <!-- คอมโพเนนต์แจ้งเตือน (ถ้าใช้ในโปรเจกต์) -->
  <NotifyMessage v-model:show="toast.show" :type="toast.type" :title="toast.title" :message="toast.message"
    :life="toast.life" />
  <NotificationPopup v-model:visible="notification.visible" :state="notification.state" :title="notification.title"
    :detail="notification.detail" :timeout="notification.timeout" :redirect-url="notification.redirectUrl"
    :auto-close="notification.autoClose" />
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const route = useRoute()

/* ---------- mock data (แทน API) ---------- */
const resFinishSurveyWarning = ref([
  {
    id: 'fin-1',
    ImageProfileURL:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop',
    Business: {
      shop_name_i18n: { th: 'โอ้กะจู๋ สาขา 1', en: 'Ohkajhu Branch 1', cn: '欧加猪 1店' },
      shop_province: { provinces_name_i18n: { th: 'เชียงใหม่', en: 'Chiang Mai', cn: '清迈' } },
      shop_district: { district_name_i18n: { th: 'เมือง', en: 'Mueang', cn: '市区' } },
      shop_subdistrict: { subdistrict_name_i18n: { th: 'สันผีเสื้อ', en: 'San Phi Suea', cn: '桑披舍' } }
    },
    warning_title_i18n: { th: 'แก้ไขครบถ้วนแล้ว', en: 'Resolved', cn: '已解决' },
    warning_details_i18n: {
      th: 'ปรับปรุงกล้องวงจรปิดและเพิ่มไฟส่องสว่างเรียบร้อย',
      en: 'CCTV upgraded and lighting added.',
      cn: '已升级监控并增加照明。'
    }
  },
  {
    id: 'fin-2',
    ImageProfileURL:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=400&auto=format&fit=crop',
    Business: {
      shop_name_i18n: { th: 'โอ้กะจู๋ สาขา 2', en: 'Ohkajhu Branch 2', cn: '欧加猪 2店' },
      shop_province: { provinces_name_i18n: { th: 'เชียงใหม่', en: 'Chiang Mai', cn: '清迈' } },
      shop_district: { district_name_i18n: { th: 'สารภี', en: 'Saraphi', cn: '萨拉丕' } },
      shop_subdistrict: { subdistrict_name_i18n: { th: 'หนองหอย', en: 'Nong Hoi', cn: '农海' } }
    },
    warning_title_i18n: { th: 'ผ่านการตรวจซ้ำ', en: 'Re-inspection Passed', cn: '复检通过' },
    warning_details_i18n: {
      th: 'เพิ่มเจ้าหน้าที่รักษาความปลอดภัยช่วงกลางคืน',
      en: 'Added night security staff.',
      cn: '夜间增加保安人员。'
    }
  }
])

const resWaitSurveyWarning = ref([
  {
    id: 'wait-1',
    ImageProfileURL:
      'https://gurugurubangna.com/wp-content/uploads/2019/07/jokemaesuree002.jpg',
    Business: {
      shop_name_i18n: { th: 'โจ๊กบางนา', en: 'Joke Bangna', cn: '邦纳粥' },
      shop_province: { provinces_name_i18n: { th: 'กรุงเทพมหานคร', en: 'Bangkok', cn: '曼谷' } },
      shop_district: { district_name_i18n: { th: 'บางนา', en: 'Bang Na', cn: '邦纳' } },
      shop_subdistrict: { subdistrict_name_i18n: { th: 'บางนาเหนือ', en: 'Bang Na Nuea', cn: '邦纳北' } }
    },
    warning_title_i18n: { th: 'ติดตั้งกล้องไม่ครบจุด', en: 'Insufficient CCTV Coverage', cn: '监控覆盖不足' },
    warning_details_i18n: {
      th: 'กรุณาติดตั้งเพิ่มเติมบริเวณทางเข้า-ออกหลัก',
      en: 'Install more cameras at main entrances/exits.',
      cn: '请在主要出入口增设摄像头。'
    }
  },
  {
    id: 'wait-2',
    ImageProfileURL:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop',
    Business: {
      shop_name_i18n: { th: 'สเต็กพานิช', en: 'Steakpanit', cn: '牛排店' },
      shop_province: { provinces_name_i18n: { th: 'ลำพูน', en: 'Lamphun', cn: '南奔' } },
      shop_district: { district_name_i18n: { th: 'แม่ทา', en: 'Mae Tha', cn: '湄它' } },
      shop_subdistrict: { subdistrict_name_i18n: { th: 'ทาขุมเงิน', en: 'Tha Khum Ngoen', cn: '塔坤银' } }
    },
    warning_title_i18n: { th: 'แสงสว่างไม่เพียงพอ', en: 'Poor Lighting', cn: '照明不足' },
    warning_details_i18n: {
      th: 'เพิ่มไฟส่องสว่างบริเวณลานจอดรถ',
      en: 'Add lighting in the parking area.',
      cn: '请在停车场增加照明。'
    }
  },
  {
    id: 'wait-3',
    ImageProfileURL:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop',
    Business: {
      shop_name_i18n: { th: 'คาเฟ่ริมสวน', en: 'Garden Cafe', cn: '花园咖啡' },
      shop_province: { provinces_name_i18n: { th: 'เชียงใหม่', en: 'Chiang Mai', cn: '清迈' } },
      shop_district: { district_name_i18n: { th: 'หางดง', en: 'Hang Dong', cn: '杭东' } },
      shop_subdistrict: { subdistrict_name_i18n: { th: 'สันผักหวาน', en: 'San Phak Wan', cn: '桑帕莞' } }
    },
    warning_title_i18n: { th: 'จุดอับสายตา', en: 'Blind Spots', cn: '视线盲区' },
    warning_details_i18n: {
      th: 'จัดวางกระจกโค้งตรงทางเลี้ยว',
      en: 'Place convex mirrors at turns.',
      cn: '在转角处安装广角镜。'
    }
  }
])

/* ---------- helpers ---------- */
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

const formatShopAddress = b => {
  if (!b) return ''
  const prov = getI18n(b?.shop_province?.provinces_name_i18n, locale)
  const dist = getI18n(b?.shop_district?.district_name_i18n, locale)
  const subd = getI18n(b?.shop_subdistrict?.subdistrict_name_i18n, locale)
  const parts = [
    subd && `${t('ตำบล')} ${subd}`,
    dist && `${t('อำเภอ')} ${dist}`,
    prov && prov
  ].filter(Boolean)
  return parts.join(' ')
}

/* ---------- stubs สำหรับ Notify (ถ้ามีคอมโพเนนต์เหล่านี้ในโปรเจกต์) ---------- */
const toast = ref({ show: false, type: null, title: null, message: null, life: null })
const notification = reactive({
  visible: false,
  state: 'success',
  title: '',
  detail: '',
  timeout: 0,
  redirectUrl: null,
  autoClose: true
})

const activeTab = ref(0)
</script>
