<template>
    <div class="min-h-[100svh] bg-zinc-50">
        <!-- Header -->
        <LayoutsBaseHeader :title="t('ลงทะเบียน')" :showBack="true" />

        <!-- Card -->
        <section class="max-w-md mx-auto px-4 py-4
                pb-[calc(88px+env(safe-area-inset-bottom,0px))]">
            <div class="bg-white rounded-sm border border-zinc-200 shadow-sm p-5">
                <!-- Title -->
                <h1 class="text-[18px] font-bold text-[#1f2937]">{{ t('ลงทะเบียน') }}</h1>
                <p class="text-[13px] text-zinc-500 mt-1">
                    {{ t('สร้างบัญชีใหม่เพื่อเริ่มใช้งานแอพ') }}
                </p>

                <!-- Avatar -->
                <div class="mt-5 mb-2 flex justify-center">
                    <label class="relative block cursor-pointer">
                        <template v-if="avatarSrc">
                            <img :src="avatarSrc" alt="avatar"
                                class="w-24 h-24 rounded-full object-cover border border-zinc-200 shadow-sm" />
                        </template>
                        <template v-else>
                            <div
                                class="w-24 h-24 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                                <i class="fa-regular fa-user text-3xl"></i>
                            </div>
                        </template>
                        <input type="file" accept="image/*" class="hidden" @change="onPickAvatar" />
                        <!-- camera chip -->
                        <div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4
         w-7 h-7 rounded-full bg-white border border-zinc-300 shadow-md
         flex items-center justify-center z-10">
                            <i class="fa-solid fa-camera text-[13px] text-zinc-700"></i>
                        </div>
                    </label>
                </div>

                <!-- Fields -->
                <!-- คำนำหน้า (select แบบเส้นใต้ + ลูกศรขวา) -->
                <div class="mt-3">
                    <div class="text-[13px] text-zinc-500 mb-1">{{ t('คำนำหน้า') }}</div>
                    <!-- <div class="relative">
            <select v-model="form.prefix"
              class="input-underline appearance-none pr-8">
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            <i class="fa-solid fa-chevron-down text-zinc-400 text-xs absolute right-0 top-1/2 -translate-y-1/2"></i>
          </div> -->
                    <Dropdown v-model="form.prefix" :options="genderOptions" optionValue="value" optionLabel="label"
                        class="w-full custom-border" />
                </div>

                <!-- ชื่อ -->
                <div class="mt-3">
                    <div class="text-[13px] text-zinc-500 mb-1">{{ t('ชื่อบัญชี') }}</div>

                    <InputText v-model="form.first_name" class="w-full input-underline" placeholder="ชื่อบัญชี"
                        autocomplete="given-name" />
                </div>

                <!-- นามสกุล -->
                <div class="mt-3">
                    <div class="text-[13px] text-zinc-500 mb-1">{{ t('นามสกุล') }}</div>

                    <InputText v-model="form.last_name" class="w-full input-underline" placeholder="ชื่อบัญชี"
                        autocomplete="given-last_name" />
                </div>

                <!-- อีเมล -->
                <div class="mt-3">
                    <div class="text-[13px] text-zinc-500 mb-1">{{ t('อีเมล') }}</div>

                                            <InputText type="email" v-model="form.email" class="w-full input-underline" placeholder="yourname@gmail.com"
                        autocomplete="email" />
                </div>
            </div>

            <!-- Next button -->
            <div class="fixed left-0 right-0 bottom-0 z-20">
                <div class="mx-auto max-w-md w-full px-4 pt-3"
                    :style="{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }">
                    <Button class="w-full  active:scale-[.99]" rounded>
                        {{ t('ถัดไป') }}
                    </Button>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const genderOptions = [
    { label: 'นาย', value: "นาย" },
    { label: 'นางสาว', value: "นางสาว" },
    { label: 'นาง', value: "นาง" },
];
const form = ref({
    prefix: 'นาย',
    first_name: 'สมชาย',
    last_name: 'ยิ้มสดใส',
    email: 'yourname@gmail.com',
})

const avatarSrc = ref('')
const onPickAvatar = (e) => {
    const file = e.target?.files?.[0]
    if (!file) return
    avatarSrc.value = URL.createObjectURL(file)
    e.target.value = '' // เลือกซ้ำได้
}

const onNext = () => {
    // submit / navigate ต่อได้ตามต้องการ
}
</script>

<style scoped>
.input-underline {
    @apply block w-full bg-transparent outline-none border-0 border-b border-zinc-200 rounded-none text-[15px] text-zinc-800 py-3 px-0;
}

.input-underline::placeholder {
    @apply text-zinc-400;
}

.input-underline:focus {
    box-shadow: none;
    border-color: #a3a3a3;
    /* zinc-400 */
}
</style>
