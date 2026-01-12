<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const emit = defineEmits(['success'])

const toast = useToast()

// --- 保持业务逻辑配置不动 ---
const item: AuthFormField[] = [
    {
        name: 'hitokoto',
        type: 'text',
        label: '一言',
        placeholder: '请输入你要提交的一言',
        required: true
    },
    {
        name: 'original',
        type: 'text',
        label: '出处',
        placeholder: '请输入上述一言的出处',
        required: true
    },
    {
        name: 'from_who',
        type: 'text',
        label: '出自谁',
        placeholder: '请输入角色名',
        required: true
    },
    {
        name: 'types',
        type:'select',
        items: [
            { label:'神人神言', value:'godman' },
            { label:'喵言喵语', value:'neko' }
        ],
        label:'一言类型',
        required: true,
        searchInput:{
            placeholder:'搜索……'
        }
    }
]

const schema = z.object({
    hitokoto: z.string('请输入文本').trim().min(1, '请输入文本'),
    original: z.string('请输入文本').trim().min(1, '请输入文本'),
    from_who: z.string('请输入文本').trim().min(1, '请输入文本'),
    types: z.object(
        {
            label: z.string(),
            value: z.string()
        },('请选择一言类型')
    )
})

type Schema = z.infer<typeof schema>

async function Onsubmit(payload: FormSubmitEvent<Schema>){
    try {
        await $fetch('/api/v2/hitokoto/add', {
            method: 'POST',
            body: {
                "hitokoto": `${payload.data.hitokoto}`,
                "original": `${payload.data.original}`,
                "from_who": `${payload.data.from_who}`,
                "types": `${payload.data.types.value}`
            }
        })
        toast.add({ title: '系统提示',description:'提交成功',color: 'success' })
        emit('success')
    } catch (err) {
        if (err instanceof FetchError){
            toast.add({
                title:'系统提示',
                description:err.data?.message,
                color: 'error'
            })
        }
    }
}
</script>

<template>
    <div class="m-5">
        <UAuthForm
                :schema="schema"
                title="提交一言"
                description="分享那些直击心灵的文字"
                icon="i-lucide-feather"
                :fields="item"
                :submit="{
        label: '提交一言',
        class: 'rounded-full w-full'
      }"
                :ui="{
        base: 'space-y-3',
        header: 'text-center flex flex-col items-center mb-4',
        title: 'text-xl font-bold tracking-tight',
        description: 'text-xs text-gray-500',
        icon: 'w-8 h-8 text-primary mb-2'
      }"
                @submit="Onsubmit"
        />

        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-[10px] text-center text-gray-400 tracking-widest uppercase">
            User Contribution Portal
        </div>
    </div>
</template>

<style scoped>
:deep(.u-auth-form) {
    max-height: 80vh;
    overflow-y: auto;
    padding-right: 4px;
}
:deep(.u-form-group) {
    margin-bottom: 0.75rem;
}
</style>