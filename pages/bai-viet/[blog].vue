<template>
    <div class="max-w-[1200px] mx-auto sm:grid grid-cols-12 gap-x-12 py-20 px-3">
        <div class="col-span-12">
            <BlogHeader
                :title="data.title"
                :image="data.image"
                :alt="data.alt"
                :date="data.date"
                :description="data.description"
                :tags="data.tags"
            />

            <div
                class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
            >
                <ContentRenderer v-if="articles" :value="articles">
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>
            </div>
        </div>
    </div>
</template>

<script setup>
const { path } = useRoute();
const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
    queryContent(path).findOne()
);

const data = computed(() => {
    return {
        title: articles.value?.title || "no-title available",
        description: articles.value?.description || "no-description available",
        image: articles.value?.image || "/not-found.jpg",
        alt: articles.value?.alt || "no alter data available",
        ogImage: articles.value?.ogImage || "/not-found.jpg",
        date: articles.value?.date || "not-date-available",
        tags: articles.value?.tags || [],
        published: articles.value?.published || false,
    };
});

useHead({
    title: data.value.title || "",
    meta: [
        { name: "description", content: data.value.description },
        {
            name: "description",
            content: data.value.description,
        },
        { property: "og:site_name", content: "CHÀO MỪNG LỄ KỶ NIỆM" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
            property: "og:title",
            content: data.value.title,
        },
        {
            property: "og:description",
            content: data.value.description,
        },
        {
            property: "og:image",
            content: data.value.ogImage || data.value.image,
        },
    ],
    link: [
        {
            rel: "canonical",
            href: `https://blog-nurriyad.vercel.app/${path}`,
        },
    ],
});
</script>

<style lang="scss" scoped></style>
