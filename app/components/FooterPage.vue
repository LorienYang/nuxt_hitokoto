<template>
    <UFooter class="border-t border-gray-100 dark:border-gray-900">
        <template #left>
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Copyright © {{ new Date().getFullYear() }} Lorien Yang.
            </div>
        </template>

        <template #right>
            <div class="flex items-center gap-4">
                <UButton
                        to="https://beian.miit.gov.cn/"
                        target="_blank"
                        variant="ghost"
                        size="xs"
                        class="font-normal text-gray-400 hover:text-primary"
                >
                    <template #leading>
                        <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5" />
                    </template>
                    浙ICP备2025171659号-2
                </UButton>

                <UButton
                        icon="i-simple-icons-github"
                        variant="ghost"
                        to="https://github.com"
                        target="_blank"
                        color="neutral"
                />
            </div>
        </template>
    </UFooter>
</template>

<script setup lang="ts">
</script>