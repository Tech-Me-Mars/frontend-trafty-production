<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const onSubmit = () => {
    console.log('Login with', email.value, password.value)
    // router.push('/')
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-start pt-24 bg-white">
        <!-- Logo or Top Decoration (mocked by gradient curve) -->
        <!-- <div class="absolute top-0 w-full h-40 bg-gradient-to-r from-indigo-900 via-yellow-400 to-red-500 rounded-b-full"></div> -->

        <div class="z-10 w-full max-w-md px-4">
            <div class="bg-white rounded-lg  p-1">
                <h2 class="text-xl font-bold text-gray-900 mb-4">เข้าสู่ระบบ</h2>

                <!-- Language Select -->
                <div class="flex justify-end mb-4">
                    <Dropdown v-model="locale" :options="['ไทย', 'EN']" class="w-32" />
                </div>
                <div class="mb-4">
                    <IconField>
                        <InputIcon class="pi pi-envelope" />
                        <InputText v-model="email" class="w-full" placeholder="กรุณากรอกอีเมล" />
                    </IconField>

                </div>

                <!-- Password -->
                <div class="mb-4">
                    <IconField>
                        <InputIcon class="pi pi-lock" />
                        <!-- <Password v-model="password" toggleMask :feedback="false" maskIcon="pi pi-envelope"  class="w-full" inputClass="w-full"
                        placeholder="กรุณากรอกรหัสผ่าน" /> -->
                        <InputText type="password" v-model="password" class="w-full" placeholder="กรุณากรอกอีเมล" />

                    </IconField>
                </div>

                <!-- Links -->
                <div class="flex justify-between text-sm mb-4 text-primary">
                    <NuxtLink to="/register" class="hover:underline">สมัครสมาชิก</NuxtLink>
                    <NuxtLink to="/forgot-password" class="hover:underline">ลืมรหัสผ่าน?</NuxtLink>
                </div>

                <!-- Login Button -->
                <Button label="เข้าสู่ระบบ" class="w-full bg-indigo-800 hover:bg-indigo-900 text-white"
                    @click="onSubmit" />

                <!-- Or Divider -->
                <div class="flex items-center my-6">
                    <div class="flex-grow h-px bg-gray-300"></div>
                    <span class="px-3 text-sm text-gray-500">or login with</span>
                    <div class="flex-grow h-px bg-gray-300"></div>
                </div>

                <!-- Google Button -->
                <Button class="w-full border border-gray-300 text-gray-700 flex items-center justify-center gap-2" outlined>
  <img src="/image/social-button/google.png" alt="Google" class="w-5 h-5" />
  Continue with Google
</Button>

            </div>
        </div>
    </div>
</template>
