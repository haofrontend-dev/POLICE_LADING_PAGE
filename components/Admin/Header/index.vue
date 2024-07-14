
<script setup>
const client = useSupabaseClient();
const router = useRouter();

const authState = useState("auth");
const logUserOut = async () => {
    try {
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        authState.value = null; // set authenticated  state value to false
        token.value = null; // clear the token cookie
        await client.auth.signOut();
        navigateTo("/admin/login");
    } catch (error) {}
};
</script>

<template>
    <header
        class="w-full fixed top-0 left-0 right-0 h-auto z-[10] bg-[#F8E6A6] shadow-md lg:pl-[300px] lg:pr-[300px] px-3"
    >
        <div class="flex justify-between h-full py-4">
            <button to="/admin" class="text-2xl font-bold text-[#962400]" @click="navigateTo('/admin')">
               Admin</button
            >

            <nav class="flex items-center gap-3 text-[#962400] font-semibold">
                <NuxtLink to="/admin">Chỗ ngồi</NuxtLink>
                <NuxtLink to="/admin/users">Danh sách</NuxtLink>
            </nav>
            <button class="text-lg font-semibold inline-flex items-center gap-3 hover:text-[#962400]/80" @click="logUserOut">
                <span class=" hidden lg:inline-block">Logout </span>
                <Icon name="material-symbols:logout" />
            </button>
        </div>
    </header>
</template>


<style lang="scss" scoped>
.router-link-active.router-link-exact-active {
    text-decoration: underline;
}
</style>
