<template>
    <div class="container mx-auto py-[50px]">
        <div class="mb-4 max-w-4xl mx-auto">
            <h1 class="text-2xl text-center font-bold">{{ data.title }}</h1>
            <h2 class="text-2xl text-center font-bold">{{ data.subtitle }}</h2>
            <h3 class="text-right italic text-xl font-medium">{{ data.author }}</h3>
        </div>
        <div class="max-w-5xl mx-auto px-2">
            <ContentRenderer style="width: 100%" :value="data" class="text-justify" />
        </div>
        <audio ref="audioRef" src="/images/audio.mp3"></audio>
        <button class="fixed bottom-10 text-[#962400] right-10 text-3xl" @click="handleActiveAudio">
            <Icon name="mdi:volume-high" v-if="isShowPlay" />
            <Icon name="mdi:volume-off" v-else />
        </button>
    </div> 
</template>

<script setup>
const { data } = await useAsyncData("[...slug]", () =>
    queryContent("/").findOne()
);

const audioRef = ref(null);
const isShowPlay = ref(false);

const handleActiveAudio = () => {
    if (audioRef.value.paused) {
        audioRef.value.play();
        isShowPlay.value = true;
    } else {
        audioRef.value.pause();
        isShowPlay.value = false;
    }
};
</script>

<style lang="scss"></style>
