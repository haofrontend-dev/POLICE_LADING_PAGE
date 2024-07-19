<template>
    <div class="px-4">
        <div class="mt-10 lg:px-6">
            <h2 class="text-2xl font-bold text-[#FFC700] text-center uppercase">
                XÁC NHẬN THAM GIA
            </h2>
            <form
                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px] mt-4"
            >
                <div>
                    <label
                        for="countries"
                        class="block mb-2 text-lg text-[#962400] font-bold"
                    >
                        Đại biểu trong/ngoài lực lượng CAND
                    </label>
                    <div class="relative">
                        <select
                            v-model="selectDelegate"
                            id="countries"
                            class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                        >
                            <option value="" selected>Vui lòng chọn...</option>
                            <option value="TCAND" selected class="text-black">
                                Đại biểu, khách mời trong lực lượng CAND
                            </option>
                            <option value="NCAND" class="text-black">
                                Đại biểu, khách mời ngoài lực lượng CAND
                            </option>
                        </select>
                        <span class="absolute right-4 top-1/2 -translate-y-1/2">
                            <IconArrowDown />
                        </span>
                    </div>
                </div>

                <div>
                    <label
                        for="countries"
                        class="block mb-2 text-lg text-[#962400] font-bold"
                    >
                        Đơn vị
                    </label>
                    <div class="relative">
                        <select
                            v-model="selectUnit"
                            id="countries"
                            class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                        >
                            <option :value="null" selected>
                                Vui lòng chọn...
                            </option>
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
                    <label
                        for="countries"
                        class="block mb-2 text-lg text-[#962400] font-bold"
                    >
                        Cơ quan, tổ chức, cá nhân
                    </label>
                    <div class="relative">
                        <select
                            v-model="selectAgency"
                            id="countries"
                            class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                        >
                            <option :value="null" selected>
                                Vui lòng chọn...
                            </option>
                            <option
                                v-for="angency in agenciesOptions"
                                :key="angency.name"
                                :value="angency"
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
                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-3 md:px-6 relative text-center"
                        @click="handleFocusInput"
                    >
                        <input
                            ref="inputSearch"
                            v-model="valueSearch"
                            class="w-full md:w-1/2 outline-none lg:text-lg text-[#8B8B8B]"
                            type="text"
                            placeholder="Tìm kiếm theo tên cơ quan, tổ chức cá nhân... "
                            @input="handleSearch"
                            @blur="handleBlurInput"
                        />
                        <button
                            v-if="valueSearch"
                            type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl flex items-center justify-center"
                            @click="valueSearch = ''"
                        >
                            <Icon name="carbon:close-outline" />
                        </button>
                        <ul
                            v-if="
                                dataSearchName.length > 0 &&
                                isShowDataSearch &&
                                valueSearch
                            "
                            class="flex flex-col rounded-md bg-white shadow-md py-2 px-3 absolute top-[110%] left-0 w-full max-h-80 overflow-y-auto"
                        >
                            <li
                                v-for="item in dataSearchName"
                                :key="item.name"
                                class="text-lg text-[#8B8B8B] hover:text-[#962400] hover:bg-slate-400 cursor-pointer py-3"
                                @click="handleSelect(item)"
                            >
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <button
                        class="px-[43px] h-full rounded-md py-2 md:py-3 text-base md:text-lg bg-[#962400] text-white hover:opacity-80 inline-flex items-center gap-2"
                        @click="handleSearchSeat"
                        type="button"
                    >
                        <Icon v-if="loading" name="eos-icons:loading" />
                         Xác nhận tham gia
                    </button>
                </div>
            </form>

            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="transform opacity-100"
                leave-to-class="transform opacity-0"
            >
                <Modal v-if="isShowModal" @close="closeModal()">
                    <div
                        class="py-4 h-full flex items-center justify-center relative overflow-hidden"
                        @click.self="closeModal"
                    >
                        <button
                            class="absolute top-2 right-2 w-[40px] h-[40px] rounded-full hover:bg-[#CE7A58]/20 flex justify-center items-center"
                            @click="closeModal()"
                        >
                            <IconClose />
                        </button>
                        <div
                            class="bg-white w-full lg:w-2/3 h-fit py-10 mx-3 lg:mx-20 px-4"
                        >
                            <div v-if="selectAgency?.full_name">
                                <p
                                    class="w-full outline-none text-sm lg:text-lg md:text-3xl text-[#8B8B8B] mb-10"
                                >
                                    {{ selectAgency?.name }}
                                </p>
                                <button
                                    v-if="
                                        isHasUserSeatCheckin(
                                            selectAgency?.seat_code,
                                            seatedState
                                        )
                                    "
                                    class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#962400] text-white hover:opacity-80"
                                    @click="handleDeleteSeat(selectAgency)"
                                >
                                    <Icon
                                        v-if="loading"
                                        name="eos-icons:loading"
                                    />
                                    Hủy chỗ
                                </button>

                               <div v-else class="flex items-center justify-center">
                                    <button
                                       
                                        class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#FFC700] text-white hover:opacity-80"
                                        @click="handleRegisterSeat(selectAgency)"
                                    >
                                        <Icon
                                            v-if="loading"
                                            name="eos-icons:loading"
                                        />
                                        Xác nhận tham gia
                                    </button>
                               </div>
                            </div>

                            <!-- START FORM DELEGATE -->
                            <form
                                v-else
                                class="grid grid-cols-1 lg:grid-cols-2 gap-[20px]"
                                @submit.prevent="handleRegisterSeat(selectAgency)"
                            >
                                <div>
                                    <label
                                        for="countries"
                                        class="block mb-2 md:text-lg text-[#962400] font-bold"
                                    >
                                        Họ và tên
                                    </label>
                                    <div>
                                        <input
                                            ref="inputSearch"
                                            v-model="fullNameValue"
                                            class="block text-[#8B8B8B] w-full py-2 md:py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                            type="text"
                                            placeholder="Họ và tên..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        for="countries"
                                        class="block mb-2 text-lg text-[#962400] font-bold"
                                    >
                                        Giới tính
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="genderValue"
                                            id="countries"
                                            class="block text-[#8B8B8B] w-full py-2 md:py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                        >
                                            <option value="" selected>
                                                Vui lòng chọn...
                                            </option>
                                            <option
                                                value="0"
                                                selected
                                                class="text-black"
                                            >
                                                Nam
                                            </option>
                                            <option
                                                value="1"
                                                class="text-black"
                                            >
                                                Nữ
                                            </option>
                                        </select>
                                        <span
                                            class="absolute right-4 top-1/2 -translate-y-1/2"
                                        >
                                            <IconArrowDown />
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        for="countries"
                                        class="block mb-2 md:text-lg text-[#962400] font-bold"
                                    >
                                        Cấp bậc
                                    </label>
                                    <div>
                                        <input
                                            ref="inputSearch"
                                            v-model="rankValue"
                                            class="block text-[#8B8B8B] w-full py-2 md:py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                            type="text"
                                            placeholder="Nhập cấp bậc"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        for="countries"
                                        class="block mb-2 md:text-lg text-[#962400] font-bold"
                                    >
                                        Chức vụ
                                    </label>
                                    <div>
                                        <input
                                            ref="inputSearch"
                                            v-model="positionValue"
                                            class="block text-[#8B8B8B] w-full py-2 md:py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                            type="text"
                                            placeholder="Nhập chức vụ "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        for="countries"
                                        class="block mb-2 md:text-lg text-[#962400] font-bold"
                                    >
                                        Số điện thoại
                                    </label>
                                    <div>
                                        <input
                                            ref="inputSearch"
                                            v-model="phoneValue"
                                            class="block text-[#8B8B8B] w-full py-2 md:py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                            type="tel"
                                            placeholder="Nhập số điện thoại..."
                                            maxlength="10"
                                        />
                                    </div>
                                </div>

                                <div class="lg:col-span-2 flex justify-center">
                                    <button
                                        class="px-[20px] inline-flex items-center gap-2 rounded-md py-1 md:py-2 text-base bg-[#962400] text-white hover:opacity-80"
                                    >
                                        <Icon
                                            v-if="loading"
                                            name="eos-icons:loading"
                                        />
                                        Xác nhận tham gia
                                    </button>
                                </div>
                            </form>
                            <!-- END FORM DELEGATE -->
                        </div>
                    </div>
                </Modal>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import _ from "lodash";
import units from "~/assets/data/unit.js";

definePageMeta({
    layout: "user",
});

const { $swal } = useNuxtApp();
const client = useSupabaseClient();

const usersState = useState("users");
const seatedState = useState("seats_selected");

await callOnce(async () => {
    const { data } = await client.from("users").select("*");
    usersState.value = data;
});

await callOnce(async () => {
    const { data } = await client.from("user_seats").select("*");
    seatedState.value = data || [];
});

const isShowModal = ref(false);
const selectDelegate = ref("");
const selectUnit = ref(null);
const selectAgency = ref(null);
const inputSearch = ref(null);
const valueSearch = ref("");
const dataSearchName = ref([]);
const isShowDataSearch = ref(false);
const loading = ref(false);
const infoDelegate = ref(null);

const fullNameValue = ref("");
const genderValue = ref("");
const rankValue = ref("");
const positionValue = ref("");
const phoneValue = ref("");

const unitOptions = computed(() => {
    return units[selectDelegate.value]?.map((unit) => {
        return {
            ...unit,
        };
    });
});

const agenciesOptions = computed(() => {
    return usersState.value?.filter((unit) => {
        return unit?.unit_id === selectUnit.value;
    });
});

const handleSearch = _.debounce(async (event) => {
    isShowDataSearch.value = true;
    try {
        const { data, error } = await client
            .from("users")
            .select("*")
            .ilike("name", `%${event.target.value.toLowerCase()}%`);

        if (error) {
            console.error(error);
        }
        dataSearchName.value = data;
    } catch (error) {
        console.error(error);
    }
}, 500);

const handleFocusInput = () => {
    if (inputSearch.value) {
        inputSearch.value.focus();
    }
};

await callOnce(async () => {
    const { data } = await client.from("users").select("*");
    usersState.value = data;
});

await callOnce(async () => {
    const { data } = await client.from("user_seats").select("*");
    seatedState.value = data || [];
});

const handleSearchSeat = () => {
    if (
        (!selectAgency.value || !selectUnit.value || !selectDelegate.value) &&
        !valueSearch.value
    ) {
        $swal.fire({
            icon: "info",
            text: "Vui lòng nhập đầy đủ thông tin",
        });
        return;
    }
    loading.value = true;
    setTimeout(() => {
        isShowModal.value = true;
        loading.value = false;
    }, 1000);
};

const handleSelect = (item) => {
    valueSearch.value = item.name;
    selectAgency.value = item;
    isShowDataSearch.value = false;
};

const closeModal = () => {
    isShowModal.value = false;
};

const createUserSeat = async (data_user) => {
    try {
        loading.value = true;
        const { data, error } = await client.from("user_seats").insert({
            id_user: data_user.id,
            seat_code: data_user.seat_code,
            is_seated: 0,
        });

        if (error) {
            throw error;
        }

        $swal.fire({
            title: "Đặt ghế thành công!",
            icon: "success",
        });
    } catch (error) {
        $swal.fire({
            title: "Đặt ghế thất bại!",
            icon: "error",
        });
    } finally {
        loading.value = false;
    }
};

const handleRegisterSeat = async (user_delegate) => {
    if (user_delegate?.full_name) {
        await createUserSeat(user_delegate);
        const { data: userSeated } = await client
            .from("user_seats")
            .select("*");
        seatedState.value = userSeated || [];
    } else {
        if (
            !fullNameValue.value ||
            !genderValue.value ||
            !rankValue.value ||
            !positionValue.value
        ) {
            $swal.fire({
                title: "Vui lòng điền đầy đủ thông tin!",
                icon: "info",
            });
        } else {
            const { data, error } = await client
                .from("users")
                .update({
                    full_name: fullNameValue.value,
                    gender: genderValue.value,
                    rank: rankValue.value,
                    position: positionValue.value,
                    phone: phoneValue.value,
                })
                .eq("id", user_delegate?.id)
                .select("*");

            if (data) {
                await createUserSeat(data[0]);
                infoDelegate.value = data[0];
            }

            if (error) {
                const { data, error: errorCreate } = await client
                    .from("users")
                    .insert({
                        full_name: fullNameValue.value,
                        gender: genderValue.value,
                        rank: rankValue.value,
                        position: positionValue.value,
                        seat_code: selectAgency.value?.seat_code,
                        name: `${positionValue.value} ${fullNameValue.value}`,
                        phone: phoneValue.value,
                    })
                    .select("*");
                if (errorCreate) {
                    $swal.fire({
                        title: "Đặt ghế thất bại!",
                        icon: "error",
                    });
                }
                if (data) {
                    await createUserSeat(data[0]);
                    infoDelegate.value = data[0];
                }
            }
        }
    }
    closeModal();
    resetForm();
    loading.value = false;
    return navigateTo("/")
};

const handleDeleteSeat = async (user_delegate) => {
    try {
        loading.value = true;
        const { error } = await client
            .from("user_seats")
            .delete()
            .eq("id_user", user_delegate?.id);
        if (error) {
            throw error;
        }

        const { data: userSeated } = await client
            .from("user_seats")
            .select("*");
        seatedState.value = userSeated || [];
        closeModal();

        $swal.fire({
            title: "Hủy ghế thành công!",
            icon: "success",
        });
    } catch (error) {
        $swal.fire({
            title: "Hủy ghế thất bại!",
            icon: "error",
        });
    } finally {
        loading.value = false;
    }
};

const resetForm = () => {
    fullNameValue.value = "";
    genderValue.value = "";
    rankValue.value = "";
    positionValue.value = "";
    phoneValue.value = "";
}
</script>

<style lang="scss" scoped></style>
