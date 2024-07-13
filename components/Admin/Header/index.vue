
<script setup>
const client = useSupabaseClient();

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
        class="w-full fixed top-0 left-0 right-0 h-auto z-[10] bg-[#F8E6A6] shadow-md lg:pl-[300px] lg:pr-[300px]"
    >
        <div class="flex justify-between h-full py-4">
            <NuxtLink to="/admin" class="text-2xl font-bold text-[#962400]"
                >Admin</NuxtLink
            >
            <button class="text-lg font-semibold inline-flex items-center gap-3 hover:text-[#962400]/80" @click="logUserOut">
                Logout 
                <Icon name="material-symbols:logout" />
            </button>
        </div>
    </header>
</template>


<style lang="scss" scoped></style>
