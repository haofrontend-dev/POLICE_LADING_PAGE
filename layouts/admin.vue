<template>
    <div class="font-lato">
        <AdminHeader />
        <main class="mt-10">
            <slot />
        </main>
    </div>
</template>

<script setup>
onMounted(() => {
    document.title = 'ADMIN - CHÀO MỪNG LỄ KỶ NIỆM'
})
</script>

<style lang="scss" scoped></style>
