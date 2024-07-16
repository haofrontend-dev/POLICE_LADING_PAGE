<script setup>
</script>

<template>
    <header
        class="w-full fixed top-0 left-0 right-0 h-auto z-50 bg-[#F8E6A6] shadow-md"
    >
        <div class="h-full">
            <div class="flex justify-center gap-3 md:gap-0 md:justify-between h-full items-center">
                <NuxtLink
                    to="/"
                    class="flex justify-center max-w-[80px] md:max-w-[168px] h-full items-center md:border-r md:border-[#962400]"
                >
                    <img
                        src="~/assets/images/logo_left.jpg"
                        class="object-cover h-full"
                    />
                </NuxtLink>

                <div
                    class="hidden md:flex flex-col items-center text-[#962400] hover:text-[#962400]/80 uppercase"
                >
                    <h1
                        class="text-lg md:text-2xl lg:text-3xl font-bold drop-shadow-md text-center"
                    >
                        CHÀO MỪNG LỄ KỶ NIỆM
                    </h1>
                    <h3
                        class="text-base md:text-lg lg:text-2xl font-semibold drop-shadow-md text-center"
                    >
                        10 NĂM NGÀY THÀNH LẬP TRUNG ĐOÀN CSCĐ TRUNG BỘ
                        (25/7/2014 - 25/7/2024)
                    </h3>
                    <h3
                        class="text-base md:text-lg lg:text-2xl font-semibold drop-shadow-md text-center"
                    >
                        VÀ ĐÓN NHẬN HUÂN CHƯƠNG CHIẾN CÔNG HẠNG BA.
                    </h3>
                </div>

                <div
                    class="flex h-full justify-center items-center md:px-[20px] lg:px-[46px]"
                >
                    <img
                        src="~/assets/images/logo_doan.png"
                        class="h-[80px] md:h-full max-w-[80px] md:max-w-[168px] object-cover"
                    />
                </div>
            </div>

            <div
                class="flex md:hidden flex-col items-center text-[#962400] hover:text-[#962400]/80 uppercase px-4 mb-3 md:mb-0 md:px-0 mt-3"
            >
                <h1
                    class="text-base md:text-2xl lg:text-3xl font-bold drop-shadow-md text-center"
                >
                    CHÀO MỪNG LỄ KỶ NIỆM
                </h1>
                <h3
                    class="text-sm md:text-lg lg:text-2xl font-semibold drop-shadow-md text-center"
                >
                    10 NĂM NGÀY THÀNH LẬP TRUNG ĐOÀN CSCĐ TRUNG BỘ (25/7/2014 -
                    25/7/2024)
                </h3>
                <h3
                    class="text-sm md:text-lg lg:text-2xl font-semibold drop-shadow-md text-center"
                >
                    VÀ ĐÓN NHẬN HUÂN CHƯƠNG CHIẾN CÔNG HẠNG BA.
                </h3>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped></style>
