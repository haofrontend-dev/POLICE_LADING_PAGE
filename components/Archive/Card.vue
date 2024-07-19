<script setup>
defineProps({
    path: String,
    title: String,
    date: String,
    description: String,
    image: String,
    alt: String,
    ogImage: String,
    tags: Array,
    published: Boolean,
    disableImage: Boolean,
    lineClampTitle: Number,
});
</script>

<template>
    <NuxtLink :to="path" class="py-3 px-1 block group border-b border-b-gray-100">
        <h3 class="text-lg text-primary font-medium mb-3 group-hover:text-[#CE7A58]">
            {{ title }}
        </h3>

        <div class="flex flex-wrap">
            <div class="w-full md:w-[30%]">
                <img :src="image" :alt="alt" class="w-full object-cover" />
            </div>

            <div class="w-full md:w-[60%] pl-3 md:mt-0 mt-2">
                <p class="text-gray-700 md:text-base text-sm">
                    {{ description }}
                </p>
            </div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
