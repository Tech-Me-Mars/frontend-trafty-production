<template>
    <header>
        <div class="flex items-center justify-between bg-sky-800 text-white p-4 shadow-md">
            <!-- Logo และ ชื่อโปรแกรม -->
            <div class="hidden md:flex items-center space-x-3">
                <NuxtLink to="/" class="hidden md:flex items-center space-x-3">
                    <img src="/image/icon_web.png" alt="Logo" class="h-10 w-10" />
                    <span class="text-xl font-bold">OPNOTE OR</span>
                </NuxtLink>
            </div>

            <div>
                <SplitButton label="Admin" icon="pi pi-user" :model="itemsLogoutButton" rounded severity="secondary">
                </SplitButton>

            </div>
        </div>
        <Menubar :model="items" :pt="{
            root: {
                class: 'border-1 border-solid !rounded-none z-50'
            }
        }" />
    </header>

</template>

<script setup>

import { navigateTo } from 'nuxt/app';

// import AppConfigurator from '@/layouts/AppConfigurator';
const items = ref([
    {
        label: 'จัดการข้อมูล',
        icon: '',
        items: [
            {
                label: 'หมวดหมู่',
                icon: '',
                command: () => {
                    navigateTo('/manage/category-main')
                }
            },
            {
                label: 'สาขา',
                icon: '',
                command: () => {
                    navigateTo('/manage/branch-main')
                }
            },
            {
                label: 'สินค้าในสาขา',
                icon: '',
                command: () => {
                    navigateTo('/manage/products-in-branch')
                }
            },
            {
                label: 'สินค้าผู้จัดจำหน่าย',
                icon: '',
                command: () => {
                    navigateTo('/manage/supplier-product')
                }
            },
        ]
    },
    {
        label: 'Login',
        icon: '',
        command: () => {
            navigateTo('/auth/login')
        }
    },
]);
const itemsLogoutButton = [
    {
        label: 'ออกจากระบบ',
        command: () => {
            localStorage.clear()
            return navigateTo('/auth/login')
        }
    }
];
</script>
<style scoped>
/* เพิ่มเติมสไตล์ถ้าจำเป็น */
</style>