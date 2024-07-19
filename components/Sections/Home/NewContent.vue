<script setup>
// Get Last 6 Publish Post from the content/blog directory
const { data } = await useAsyncData("recent-post", () =>
    queryContent("/bai-viet").limit(2).sort({ _id: 0 }).find()
);

const { data: dataPostTitle } = await useAsyncData("title-post", () =>
    queryContent("/bai-viet").limit(4).sort({ _id: 0 }).find()
);

const formattedData = computed(() => {
    return data.value?.map((articles) => {
        return {
            path: articles._path,
            title: articles.title || "no-title available",
            description: articles.description || "no-description available",
            image: articles.image || "/not-found.jpg",
            alt: articles.alt || "no alter data available",
            ogImage: articles.ogImage || "/not-found.jpg",
            date: articles.date || "not-date-available",
            tags: articles.tags || [],
            published: articles.published || false,
        };
    });
});

const formattedDataTitle = computed(() => {
    return dataPostTitle.value?.map((articles) => {
        return {
            path: articles._path,
            title: articles.title || "no-title available",
        };
    });
});
</script>

<template>
    <div
        class="w-full border-t-[3px] border-t-primary border-b-[3px] border-b-primary py-4 md:px-0"
    >
        <div
            class="flex justify-center md:justify-between items-center flex-wrap py-2 px-2 bg-gray-200 border-b-[1px] border-b-gray-400"
        >
            <h2 class="text-2xl font-bold text-primary mb-3 sm:mb-0">
                Quốc tế
            </h2>

            <ul
                class="flex items-center divide-x divide-gray-200 overflow-x-auto"
            >
                <li class="flex-shrink-0">
                    <NuxtLink
                        to="/"
                        class="hover:text-[#CE7A58] font-medium px-3"
                    >
                        Quân sự
                    </NuxtLink>
                </li>
                <li class="flex-shrink-0">
                    <NuxtLink
                        to="/"
                        class="hover:text-[#CE7A58] font-medium border-l border-gray-300 px-3"
                    >
                        Thế giới 24h
                    </NuxtLink>
                </li>

                <li class="flex-shrink-0">
                    <NuxtLink
                        to="/"
                        class="hover:text-[#CE7A58] font-medium border-l border-gray-300 px-3"
                    >
                        Bình luận
                    </NuxtLink>
                </li>

                <li class="flex-shrink-0">
                    <NuxtLink
                        to="/"
                        class="hover:text-[#CE7A58] font-medium border-l border-gray-300 px-3"
                    >
                        Hồ sơ mặt
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <div class="grid grid-cols-12 mt-3">
            <div class="lg:col-span-8 col-span-12 grid gap-2">
                <template v-for="post in formattedData" :key="post.title">
                    <ArchiveCard
                        :path="post.path"
                        :title="post.title"
                        :date="post.date"
                        :description="post.description"
                        :image="post.image"
                        :alt="post.alt"
                        :og-image="post.ogImage"
                        :tags="post.tags"
                        :published="post.published"
                    />
                </template>
            </div>
            <div class="lg:col-span-4 col-span-12 border-l border-gray-200 pl-6">
                <ul class="flex flex-col">
                    <li
                        v-for="post in formattedDataTitle"
                        :key="post.title"
                        class="border-b border-gray-300 mb-2 my-3"
                    >
                        <NuxtLink
                            :to="post.path"
                            class="hover:text-[#CE7A58] font-medium"
                        >
                            {{ post.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
