<script setup lang="ts">
import * as z from 'zod'
import type {AuthFormField, FormSubmitEvent} from '@nuxt/ui'
import {SHA256} from "crypto-es";
import {FetchError} from "ofetch";

definePageMeta({
    layout: 'auth',
    middleware: 'already-logged-in',
})

const isLoading = ref(false);
const toast = useToast()
const error = ref('')

const fields: AuthFormField[] = [{
    name:'userName',
    type:'text',
    label:'用户名',
    placeholder:'请输入你的用户名',
    required:true
},{
    name: 'email',
    type: 'email',
    label: '邮箱',
    placeholder: '请输入你的邮箱',
    required: true
}, {
    name: 'password',
    type: 'password',
    label: '密码',
    placeholder: '请输入你的密码',
    required: true
},{
    name:'inviteCode',
    type:'text',
    label:'邀请码',
    placeholder:'请输入36位邀请码',
    required:true
}]



const schema = z.object({
    userName: z.string('请输入用户名')
        .min(6,'用户名不得低于6位')
        .regex(/^[A-Za-z0-9]+$/,'用户名仅支持英文+数字组合')
        .max(16,'用户名不得超过16位')
        .trim(),
    email: z.email('无效的电子邮箱')
        .regex(/.*@(gmail|qq|163|outlook|icloud|sina)\.(com|net|cn)$/i, {
            message: '请使用主流服务商提供的邮箱'
        })
        .trim(),
    password: z.string('密码是必须的')
        .min(12, '密码最低12位')
        .regex(/^[A-Za-z0-9.]+$/,'密码仅支持英文+数字'),
    inviteCode: z.uuid('请输入邀请码')
        .trim(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    isLoading.value = true
    const SHA256_password = SHA256(payload.data.password).toString()
    try {
        const res = await $fetch('/api/v2/auth/register', {
            method: 'POST',
            body: {
                "userName":payload.data.userName,
                "email":payload.data.email,
                "password":SHA256_password,
                "inviteCode":payload.data.inviteCode
            }
        })
        isLoading.value = false
        toast.add({ title: '系统提示', description: res.message, color: 'primary' })
        return navigateTo ('/user/login')
    } catch (err) {
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
                    title="初次见面！"
                    icon="i-lucide-lock"
                    :submit="{
                        label:'注册账号',
                        icon:'i-material-symbols:login',
                        loading: isLoading,
                    }"
                    @submit="onSubmit"
            >
                <template #description>
                    已有账号? <ULink to="/user/login" class="text-primary font-medium">前往登录</ULink>.
                </template>
                <template #validation>
                    <UAlert v-if="error" color="error" icon="i-lucide-info" :title="`${error}`"/>
                </template>
                <template #footer>
                    注册则视为同意我们的<ULink class="text-primary font-medium" @click="Onerror">服务条款</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>

