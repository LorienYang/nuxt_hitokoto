export default defineNuxtRouteMiddleware(() => {
    const toast = useToast()
    const { loggedIn } = useUserSession()
    if (loggedIn.value) {
        toast.add({title:'状态异常',description:'您已登录',color:'error'})
        return navigateTo('/user')
    }
})
