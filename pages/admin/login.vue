<script setup>
definePageMeta({
    layout: "auth",
});

const client = useSupabaseClient();
const { $swal } = useNuxtApp();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const authState = useState("auth");

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.value || !password.value) {
        return;
    }
    try {
        isLoading.value = true;
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            console.error(error);
            $swal.fire({
                toast: true,
                customClass: {
                    popup: "colored-toast",
                },
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                icon: "error",
                position: "top-end",
                title: 'Tài khoản hoặc mật khẩu không đúng!',
            });
        }

        if (data) {
            authState.value = data.user;
            const token = useCookie("token", {
                expires: new Date( Date.now() + 5 * 24 * 60 * 60 * 1000) ,
            });
            token.value = data.session.access_token;
            navigateTo("/admin");
        }

        console.log(data);
    } catch (error) {
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <section class="bg-[#fdf9d4]">
        <div
            class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-screen"
        >
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
            >
                <div
                    class="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-[300px] mx-auto"
                >
                    <form
                        class="space-y-4 md:space-y-6"
                        action="#"
                        @submit="handleSubmit"
                    >
                        <div class="w-[80px] mx-auto">
                            <img class="w-full rounded-full object-cover" src="~/assets/images/logo_left.jpg" />
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Your email</label
                            >
                            <input
                                v-model="email"
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Password</label
                            >
                            <input
                                v-model="password"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required=""
                            />
                        </div>
                        <button
                            type="submit"
                            class="w-full text-white bg-[#962400] hover:opacity-80 py-2 rounded-lg  focus:ring-4 focus:outline-none"
                        >
                            <Icon v-if="isLoading" name="eos-icons:loading" />
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
