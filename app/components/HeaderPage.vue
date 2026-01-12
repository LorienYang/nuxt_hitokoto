<script setup lang="ts">
// import type { NavigationMenuItem } from '@nuxt/ui'
import Upload_Sentences from "~/components/Upload_Sentences.vue";

/*
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Docs',
        to: '/docs/getting-started',
        active: route.path.startsWith('/docs/getting-started')
    },
    {
        label: 'Components',
        to: '/docs/components',
        active: route.path.startsWith('/docs/components')
    },
    {
        label: 'Figma',
        to: 'https://go.nuxt.com/figma-ui',
        target: '_blank'
    },
    {
        label: 'Releases',
        to: 'https://github.com/nuxt/ui/releases',
        target: '_blank'
    }
])
*/

const isOpen = ref(false);

async function toggleOpen() {

    const toast = useToast()
    const { loggedIn } = useUserSession()
    if (!loggedIn.value) {
        toast.add({title:'状态异常',description:'您尚未登录',color:'error'})
    }
    else {
        isOpen.value = true
    }
}

</script>

<template>
    <div>
        <UHeader>
            <template #title>
                <h1>Nuxt · Hitokoto</h1>
            </template>

<!--            <UNavigationMenu :items="items" />-->

            <template #right>
                <UColorModeButton />
                <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
                    <UButton
                            color="neutral"
                            variant="ghost"
                            to="https://github.com/LorienYang/nuxt_hitokoto"
                            target="_blank"
                            icon="i-simple-icons-github"
                            aria-label="GitHub"
                    />
                </UTooltip>
                <UTooltip text="用户中心">
                    <UButton
                            color="neutral"
                            variant="ghost"
                            icon="i-lucide-user"
                            to="/user/"
                    />
                </UTooltip>
                <UTooltip text="提交一言">
                    <UButton
                            color="neutral"
                            variant="ghost"
                            icon="i-material-symbols:upload-rounded"
                            @click="toggleOpen"
                    />
                    <UModal v-model:open="isOpen">
                        <template #content>
                            <Upload_Sentences/>
                        </template>
                    </UModal>
                </UTooltip>
            </template>
        </UHeader>
    </div>
</template>
