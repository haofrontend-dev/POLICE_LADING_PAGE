<template>
    <tr class="animate-pulse">
        <td class="px-6 py-4 whitespace-nowrap" colspan="6">
            <Icon name="eos-icons:loading" />
        </td>
    </tr>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
