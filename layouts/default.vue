<template>
  <div class="font-lato">
    <MainHeader />
    <main class="mt-[216px] md:mt-[160px]">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script lang="ts" setup>

const counterUser = ref(0)

onBeforeMount(() => {
  document.title = 'CHÀO MỪNG LỄ KỶ NIỆM'
})

onMounted(() => {
  counterUser.value = !getStorage('counterUser') ? 0 : getStorage('counterUser')
  setStorage('counterUser', counterUser.value + 1)
})
</script>

<style>

</style>