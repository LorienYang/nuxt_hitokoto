<script setup lang="ts">
const { user, clear: clearSession } = useUserSession()

async function logout () {
    await clearSession()
}
const name = user.value?.name ?? "陌生人"
console.log(name)
</script>

<template>
    <div class="main">
        <h1>您好 {{name}}</h1>
        <div class="vp-footer-right">
            <ul class="vp-footer-links">
                <li><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="vp-footer-link">浙ICP备2025171659号-2</a></li>
                <button @click="logout">
                    Logout
                </button>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.main {
    padding: 0 50px 0 50px;
}
h1 {
    font-size: 4.5em;
    font-weight: 500;
    margin-bottom: 0;
}
p {
    font-size: 1.6em;
    font-weight: 300;
    line-height: 1.4;
}
a {
    text-decoration: none;
    color: #121314;
    position: relative;
}
a:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 60%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, .8, .13, 1);
    background-color: rgba(79,192,141,0.5);
}
a:hover:after {
    top: 0;
}

</style>