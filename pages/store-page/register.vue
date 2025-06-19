<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
const router = useRouter();
// สำหรับ tab
const activeTab = ref(0)
const isloadingAxi = useState('isloadingAxi')


// 🎯 สร้าง schema ด้วย yup
const schema = yup.object({
    name: yup.string().required('กรุณากรอกชื่อ - นามสกุล'),
    email: yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
    username: yup.string().required('กรุณากรอกชื่อผู้ใช้งาน'),
    password: yup.string().min(6, 'รหัสผ่านอย่างน้อย 6 ตัว').required('กรุณากรอกรหัสผ่าน')
})

// 🎯 ใช้ useForm จาก vee-validate
const { handleSubmit } = useForm({
    validationSchema: schema
})

// 🎯 ผูกแต่ละ field
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: username, errorMessage: usernameError } = useField('username')
const { value: password, errorMessage: passwordError } = useField('password')

// 🎯 ฟังก์ชันเมื่อกดปุ่มลงทะเบียน
const submit = handleSubmit(values => {
    isloadingAxi.value = true
    console.log('Submitted:', values)
    setTimeout(() => {
        isloadingAxi.value = false
        alert('ลงทะเบียนสำเร็จ')
    }, 1500)
})
</script>

<style>
.van-nav-bar {
    --van-nav-bar-background: #281c74;
    --van-nav-bar-text-color: white;
    --van-nav-bar-icon-color: white;
    --van-nav-bar-title-text-color: white;
    --van-nav-bar-height: 70px;
}
</style>

<template>

    <div class="min-h-screen bg-zinc pb-24">
        <van-nav-bar title="ลงทะเบียนนักท่องเที่ยว" left-arrow @click-left="router.go(-1)" />

        <van-tabs v-model:active="activeTab" line-width="40" color="#1E3A8A" title-active-color="#1E3A8A"
            class="shadow-sm">
            <van-tab title="นักท่องเที่ยว">
                <form @submit.prevent="submit">
                    <div class="bg-white rounded-lg shadow-sm p-6 mx-4 mt-4 space-y-4">
                        <h2 class="text-lg font-bold text-gray-800">ข้อมูลการลงทะเบียน</h2>

                        <!-- Name -->
                        <div>
                            <InputText v-model="name" class="w-full custom-border" placeholder="ชื่อ - นามสกุล" />
                            <small class="text-red-500 text-sm">{{ nameError }}</small>
                        </div>

                        <!-- Email -->
                        <div>
                            <InputText v-model="email" class="w-full custom-border" placeholder="อีเมล" />
                            <small class="text-red-500 text-sm">{{ emailError }}</small>
                        </div>

                        <!-- Username -->
                        <div>
                            <InputText v-model="username" class="w-full custom-border" placeholder="ชื่อผู้ใช้งาน" />
                            <small class="text-red-500 text-sm">{{ usernameError }}</small>
                        </div>

                        <!-- Password -->
                        <div>
                            <Password type="password" v-model="password" class="w-full" inputClass="custom-border !w-full"
                                placeholder="รหัสผ่าน" :feedback="false"  />
                            <small class="text-red-500 text-sm">{{ passwordError }}</small>
                        </div>
                    </div>

                    <!-- Register Button -->
                    <div class="flex justify-center mt-4 px-4">
                        <Button :loading="isloadingAxi" label="ลงทะเบียน" type="submit" severity="primary" rounded
                            class="w-full max-w-md" :pt="{ root: { class: '!border-primary-main' } }" />
                    </div>
                </form>
            </van-tab>

            <van-tab title="ผู้ประกอบการ">
                <div class="p-6 text-center text-gray-500">
                    ยังไม่เปิดให้ลงทะเบียนผู้ประกอบการ
                </div>
            </van-tab>
        </van-tabs>


    </div>

</template>
