<script setup lang="ts">
const { clear: clearSession } = useUserSession()

async function logout () {
    await clearSession()
    await navigateTo('/')
}

interface UserData {
    userName: string
    email: string
    permissions: 0 | 1 | 2
}

const UserData = ref<UserData | null>(null)

onMounted(async () => {
    UserData.value = await $fetch<UserData>('/api/v2/auth/me',{credentials: 'include',})
})

definePageMeta({
    middleware: 'authenticated'
})
</script>

<template>
    <UContainer class="py-10 max-w-2xl">
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">个人中心</h1>
            <p class="text-gray-500 mt-1">管理您的账户信息与安全设置</p>
        </div>

        <UCard>
            <template #header>
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-primary" />
                    <span class="font-semibold">基本资料</span>
                </div>
            </template>

            <div class="space-y-6">
                <div class="grid grid-cols-3 gap-4 items-center">
                    <span class="text-sm font-medium text-gray-500">用户名</span>
                    <div class="col-span-2 flex items-center justify-between">
                        <span class="text-sm text-gray-900 dark:text-gray-100">{{UserData?.userName}}</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4 items-center">
                    <span class="text-sm font-medium text-gray-500">邮箱地址</span>
                    <div class="col-span-2 flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">{{UserData?.email}}</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4 items-center">
                    <span class="text-sm font-medium text-gray-500">账号权限</span>
                    <div class="col-span-2">
                        <UBadge v-if="UserData?.permissions === 0" label="普通用户" color="primary" variant="subtle" />
                        <UBadge v-if="UserData?.permissions === 1" label="管理员" color="primary" variant="subtle" />
                        <UBadge v-if="UserData?.permissions === 2" label="超级管理员" color="primary" variant="subtle" />
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between gap-3">
                    <UButton
                            v-if="UserData?.permissions !== undefined && UserData.permissions > 0"
                            label="管理面板"
                            icon="i-lucide-settings"
                            color="primary"
                            variant="solid"
                    />
                    <UButton
                            label="退出登录"
                            icon="i-lucide-log-out"
                            color="error"
                            variant="soft"
                            @click="logout"
                    />
                </div>
            </template>
        </UCard>
    </UContainer>
</template>
