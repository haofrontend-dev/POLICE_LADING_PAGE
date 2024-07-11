<template>
    <div class="fixed z-50 overflow-auto  top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] py-6 px-3 md:px-10" @click.self="closeModal()">
        <slot />
    </div>
</template>

<script setup>
const emits = defineEmits(['close'])
const closeModal = () => {
    emits('close')
}
</script>

<style lang="scss" scoped>

</style>