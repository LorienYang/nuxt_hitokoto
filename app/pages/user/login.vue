<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import {SHA256} from "crypto-es";
import {FetchError} from "ofetch";
const { loggedIn, user} = useUserSession()

definePageMeta({
    layout: 'auth',
    middleware:'already-logged-in'
})

const toast = useToast()
const error = ref('')
const isLoading = ref(false)

const fields: AuthFormField[] = [{
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: '请输入你的邮箱',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '请输入你的密码',
    required: true
}]


const schema = z.object({
    email: z.email('无效的电子邮箱')
        .regex(/.*@(gmail|qq|163|outlook|icloud|sina)\.(com|net|cn)$/i, {
            message: '请使用主流服务商提供的邮箱'
        })
        .trim(),
    password: z.string('密码是必须的')
        .min(12, '密码最低12位')
        .regex(/^[A-Za-z0-9.]+$/,'密码仅支持英文+数字'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    isLoading.value = true
    await sleep(1000)
    error.value = ''
    const SHA256_password = SHA256(payload.data.password).toString()
    try {
        await $fetch('/api/v2/auth/login', {
            method: 'POST',
            body: {
                "email": payload.data.email,
                "password": SHA256_password
            }
        })
        const { fetch } = useUserSession()
        await fetch()
        isLoading.value = false
        toast.add({title: '系统提示', description: '登录成功'})
        await navigateTo('/user/')
    }catch (err) {
        isLoading.value = false
        if (err instanceof FetchError) {
            error.value = err.data?.message
            await sleep(5000)
            error.value = ''
        }
    }
}

function Onerror(){
    toast.add({title:'系统错误',description:'没有服务条款哦',color:'error'})
}
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4 md:w-175">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                    :schema="schema"
                    :fields="fields"
                    title="欢迎回来！"
                    icon="i-lucide-lock"
                    :submit="{
                        label:'登录账号',
                        icon:'i-material-symbols:login',
                        loading: isLoading
                    }"
                    @submit="onSubmit"
            >
                <template #description>
                    还未注册? <ULink to="/user/register" class="text-primary font-medium">前往注册</ULink>.
                </template>
                <template #validation>
                    <UAlert v-if="error" color="error" icon="i-lucide-info" :title="`${error}`" />
                </template>
                <template #footer>
                    登录则视为同意我们的<ULink class="text-primary font-medium" @click="Onerror">服务条款</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>

