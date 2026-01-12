<template>
    <div class="py-16 md:py-24 flex flex-col items-center">
        <div class="mb-8 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 flex items-center gap-2">
            <span class="flex h-2 w-2 rounded-full bg-primary animate-pulse"/>
            <span class="text-xs font-medium text-primary tracking-wide uppercase">System Online</span>
        </div>

        <div class="max-w-3xl text-center space-y-6 px-4">
            <h1 class="text-4xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white">
                NUXT · <span class="text-primary">Hitokoto</span>
            </h1>
        </div>
        <div class="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <UButton
                    to="/user/login"
                    label="开启使用"
                    size="xl"
                    icon="i-lucide-sparkles"
                    class="rounded-full px-10 shadow-lg shadow-primary/20"
            />
        </div>

        <div class="mt-24 opacity-30 select-none">
            <div class="flex items-center gap-4 text-gray-400">
                <div class="h-px w-12 bg-current"/>
                <UIcon name="i-lucide-feather" class="w-5 h-5" />
                <div class="h-px w-12 bg-current"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
:deep(.u-container) {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>