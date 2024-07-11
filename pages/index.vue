<script setup>
import units from '~/assets/data/unit.js'
import nameAgency from '~/assets/data/nameAgency.js'

const video = ref(null);
const isShowPlay = ref(true);
const counterUser = ref(0)
const isShowModal = ref(false)
const selectDelegate = ref("")
const selectUnit = ref(null)
const selectAgency = ref(null)
const inputSearch = ref(null)
const valueSearch = ref("")
const dataSearchName = ref([])
const isShowDataSearch = ref(false)
const selectedSeatDara = ref(null);

const unitOptions = computed(() => {
    return units[selectDelegate.value]?.map((unit) => {
        return { 
            ...unit
        }
    })
})

const agenciesOptions = computed(() => {
    return unitOptions.value?.find((unit) => {
        return unit.value === selectUnit.value
    })?.children;
})

const handleSearch = (event) => {
    isShowDataSearch.value = true
    valueSearch.value = event.target.value
    dataSearchName.value = nameAgency.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
}

const handleFocusInput = () => {
    if (inputSearch.value) {
        inputSearch.value.focus();
    }
}

const playVideo = () => {
    if (video.value) {
        video.value.play();
        isShowPlay.value = false
    } 
}

const stopVideo = () => {
    if (video.value) {
        video.value.pause();
        isShowPlay.value = true
    }
}

const resetVideo = () => {
    if (video.value) {
        video.value.currentTime = 0;
        isShowPlay.value = true;
    }
}

const openModal = () => {
    isShowModal.value = true
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    isShowModal.value = false
    document.body.style.overflow = 'auto'
}

const handleSelect = (item) => {
    valueSearch.value = item.name
    selectAgency.value = item.value
    isShowDataSearch.value = false
}

onMounted(() => {
    if (video.value) {
        video.value.addEventListener('ended', resetVideo);
    }
    if (!getStorage('counterUser')) {
        setStorage('counterUser', 0);
    }
    counterUser.value = getStorage('counterUser');
})
</script>

<template>
    <div class="mt-[26px]">
       <section class="py-14 bg-[#FFF9C0]">
            <div class="w-full bg-[#D71920] px-[30px] uppercase flex relative overflow-x-hidden">
                <div 
                    class="text-center animate-marquee py-[15px] text-base md:text-lg lg:text-[28px] font-bold text-[#FFC700] overflow-hidden whitespace-nowrap">
                    <span class="mx-4">NHIỆT LIỆT CHÀO MỪNG CÁC ĐỒNG CHÍ LÃNH ĐẠO, ĐẠI BIỂU ĐẾN DỰ LỄ KỶ NIỆM 10 NĂM NGÀY THÀNH LẬP TRUNG</span>
                </div>

                <div 
                    class="absolute rop-0 animate-marquee2 py-[15px] text-center text-base md:text-lg lg:text-[28px] font-bold text-[#FFC700] overflow-hidden whitespace-nowrap">
                    <span class="mx-4">NHIỆT LIỆT CHÀO MỪNG CÁC ĐỒNG CHÍ LÃNH ĐẠO, ĐẠI BIỂU ĐẾN DỰ LỄ KỶ NIỆM 10 NĂM NGÀY THÀNH LẬP TRUNG</span>
                </div>
            </div>

            <div class="md:container mx-auto">
                <div class="px-4 sm:px-[100px] xl:px-[255px] my-10">
                    <button 
                        class="block w-full py-[14px] px-[18px] bg-[#FFEF5E] text-[#D71920] hover:opacity-80 rounded-[15px] shadow-md" @click="openModal()"
                    >
                        <span class="text-[13px] sm:text-lg lg:text-2xl text-center font-bold drop-shadow-md">
                            KÍNH MỜI CÁC ĐỒNG CHÍ LÃNH ĐẠO, ĐẠI BIỂU BẤM VÀO ĐÂY ĐỂ TÌM KIẾM CHỖ NGỒI (Ô TÌM KIẾM)
                        </span>
                    </button>
                </div>
            </div>

            <div class="md:container mx-auto">
                <div class="px-4 sm:px-[100px] xl:px-[255px]">
                    <NuxtLink
                        class="block w-full py-[14px] px-[14px] md:px-[18px] bg-[#CE7A58] text-white hover:opacity-80 rounded-[15px] shadow-md">
                            <span 
                                class="text-[13px] sm:text-lg lg:text-[20px] text-center font-bold drop-shadow-md border border-[#FFEF5E] block p-1">
                                    TÌM HIỂU VỀ MÔ HÌNH TỔ CHỨC CỦA TRUNG ĐOÀN CSCĐ TRUNG BỘ.
                            </span>
                    </NuxtLink>
                </div>
            </div>

            <div class="md:container mx-auto">
                <h3 class="my-[73px] text-center text-[#962400] text-base sm:text-[20px] font-semibold"> 
                    VIDEO TRUNG ĐOÀN CSCĐ TRUNG BỘ - 1O NĂM XÂY DỰNG, CHIẾN ĐẤU VÀ PHÁT TRIỂN!
                </h3>

                <div class="px-2 md:px-20 relative">
                    <div class="w-full relative">
                        <video ref="video" class="w-full" :controls="!isShowPlay"  poster="~/assets/images/thumb_video.png">
                            <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
                        </video>
                        <button
                            v-if="isShowPlay"
                            class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[1] w-[80px] h-[80px] rounded-full flex justify-center items-center bg-[#D9D9D9] hover:opacity-80"
                            @click="playVideo()"
                        >
                            <IconPlay />
                        </button>
                    </div>
                </div>
            </div>
       </section>

       <section class="my-[80px] md:my-[160px]">
            <div class="md:container mx-auto">
                <h2 class="uppercase text-center lg:text-[20px] font-bold text-[#962400] mb-6 md:mb-14"> 
                    HÌNH ẢNH HOẠT ĐỘNG CỦA TRUNG ĐOÀN CSCĐ TRUNG BỘ
                </h2>

                <Swiper
                    :modules="[SwiperAutoplay, SwiperNavigation]"
                    :loop="true"
                    :effect="'creative'"
                    :navigation="true"
                    :autoplay="{
                        delay: 2000,
                    }"
                    :creative-effect="{
                        prev: {
                            shadow: false,
                            translate: ['-20%', 0, -1],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }"
                    :breakpoints="{
                        '640': {
                            slidesPerView: 2,
                        },
                        '768': {
                            slidesPerView: 2,
                        },
                        '1024': {
                            slidesPerView: 4,
                        },
                    }"
                >
                    <SwiperSlide v-for="slide in 5" :key="slide" class="py-4">
                        <div class="bg-white shadow-md rounded-[15px] mx-3 overflow-hidden">
                           <div class="thumbnail">
                                <img src="~/assets/images/slider_1.png" class="w-full h-[163px]" />
                           </div>
                           <div class="content px-[20px] pt-4 pb-6">
                                <p class="line-clamp-3 text-ellipsis text-[#333] font-semibold">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                </p>
                           </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
       </section>

       <div class="flex items-center gap-2 mb-2 pl-3">
            <p class="text-lg md:text-2xl text-[#333] font-bold">Số lương truy cập: </p>
            <p class="px-5 py-1 bg-[#CE7A58] text-[#FFC700] rounded-[5px] font-bold">{{ counterUser  }}</p>
       </div>

       <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="transform opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
       >
            <Modal v-if="isShowModal" @close="closeModal()"> 
                <div class="bg-white py-4 h-full relative overflow-hidden w-screen">
                    <button class="absolute top-2 right-2 w-[40px] h-[40px] rounded-full hover:bg-[#CE7A58]/20 flex justify-center items-center" @click="closeModal()">
                        <IconClose />
                    </button>

                    <div class="mt-10 px-6">
                        <h2 class="text-2xl font-bold text-[#FFC700] text-center uppercase">TÌM KIẾM CHỖ NGỒI</h2>
                        <form class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                           <div>
                                <label for="countries" class="block mb-2 text-lg text-[#962400] font-bold">
                                    Đại biểu trong/ngoài lực lượng CAND
                                </label>
                                <div class="relative">
                                    <select
                                        v-model="selectDelegate"
                                        id="countries" 
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                    >
                                        <option value="" selected>Vui lòng chọn...</option>
                                        <option value="TCAND" selected class="text-black">Đại biểu, khách mời trong lực lượng CAND</option>
                                        <option value="NCAND" class="text-black">Đại biểu, khách mời ngoài lực lượng CAND</option>
                                    </select>
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2">
                                        <IconArrowDown />
                                    </span>
                                </div>
                           </div>

                           <div>
                                <label for="countries" class="block mb-2 text-lg text-[#962400] font-bold">
                                    Đơn vị
                                </label>
                                <div class="relative">
                                    <select
                                        v-model="selectUnit"
                                        id="countries" 
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                    >
                                        <option :value="null" selected>Vui lòng chọn...</option>
                                        <option 
                                            v-for="(init, index) in unitOptions" 
                                            :key="index" 
                                            :value="init.value" 
                                            class="text-black"
                                        >
                                            {{ init.name }}
                                        </option>
                                    </select>
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2">
                                        <IconArrowDown />
                                    </span>
                                </div>
                           </div>

                           <div>
                                <label for="countries" class="block mb-2 text-lg text-[#962400] font-bold">
                                    Cơ quan, tổ chức, cá nhân
                                </label>
                                <div class="relative">
                                    <select
                                        v-model="selectAgency"
                                        id="countries" 
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                    >
                                        <option :value="null" selected>Vui lòng chọn...</option>
                                        <option 
                                            v-for="angency in agenciesOptions" 
                                            :key="angency.name" 
                                            :value="angency.value" 
                                            class="text-black"
                                        >
                                            {{ angency.name }}
                                        </option>
                                    </select>
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2">
                                        <IconArrowDown />
                                    </span>
                                </div>
                           </div>

                           <div class="md:col-span-2">
                                <div 
                                    class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative text-center"
                                    @click="handleFocusInput"
                                >
                                    <input ref="inputSearch" :value="valueSearch" class="w-1/2 outline-none text-lg text-[#8B8B8B]" type="text" placeholder="Tìm kiếm theo tên cơ quan, tổ chức cá nhân... " @input="handleSearch" @blur="handleBlurInput"/>
                                    <button 
                                        v-if="valueSearch" 
                                        type="button" 
                                        class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl" 
                                        @click="valueSearch = ''"
                                    >
                                        <Icon name="carbon:close-outline" />
                                    </button>
                                    <ul
                                        v-if="dataSearchName.length > 0 && isShowDataSearch" 
                                        class="flex flex-col rounded-md bg-white shadow-md py-2 px-3 absolute top-[110%] left-0 w-full max-h-80 overflow-y-auto"
                                    >
                                        <li 
                                            v-for="item in dataSearchName" 
                                            :key="item.name" 
                                            class="text-lg text-[#8B8B8B] hover:text-[#962400] hover:bg-slate-400 cursor-pointer py-3" 
                                            @click="handleSelect(item)">
                                            {{ item.name }}
                                        </li>
                                    </ul>
                                </div>
                           </div>

                           <div class="">
                                <button 
                                    class="px-[43px] h-full rounded-md py-3 text-lg bg-[#962400] text-white hover:opacity-80"
                                    @click="handleSearcNameSeat"
                                >
                                    Tìm kiếm
                                </button>
                           </div>
                        </form>

                        <SeatingChart :seat-id="selectAgency" />
                    </div>
                </div>
            </Modal>
       </Transition>
    </div>
</template>

<style lang="scss" scoped>

</style>