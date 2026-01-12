<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen flex flex-col">
        <HeaderPage />
        <UMain class="flex-1 flex flex-col min-h-50">
            <UContainer class="flex-1 w-full py-8">
                <NuxtPage />
            </UContainer>
        </UMain>
        <FooterPage />
    </div>
</template>

<style>

</style>