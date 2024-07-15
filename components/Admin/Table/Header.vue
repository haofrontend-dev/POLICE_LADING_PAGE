<template>
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th v-for="item in items" :key="item" scope="col" class="px-6 py-3 border border-slate-600" :style="{textAlign: item?.align}">
                {{  item?.label  }}
            </th>
        </tr>
    </thead>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped></style>
