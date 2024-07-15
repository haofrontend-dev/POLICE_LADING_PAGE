<script setup>
import { isHasUserSeat } from "~~/utils/getName";
const { $swal } = useNuxtApp();
const client = useSupabaseClient();

const usersState = useState("users");
const seatedState = useState("seats_selected");

const props = defineProps([
    "id",
    "row",
    "column",
    "status",
    "isSelect",
    "color",
    "styleRow",
    "selectSeatId",
    "isSeated",
]);

const infoDelegate = ref(null);
const isShowModal = ref(false);
const valueName = ref("");
const loading = ref(false);
const fullNameValue = ref("");
const genderValue = ref("");
const rankValue = ref("");
const positionValue = ref("");
const seatCodeSelect = ref(null);
const isModalChangeSeat = ref(false);
const seatCodeValue = ref("");
const loadingChangeSeat = ref(false);

const seatClass = computed(() => {
    return "seat";
});

const seatStyle = computed(() => {
    return {
        ...props.styleRow,
    };
});

const handleSelectSeat = (value) => {
    isShowModal.value = true;
    seatCodeSelect.value = value;
    infoDelegate.value = getNameSeat(value, usersState.value);
    valueName.value = infoDelegate.value?.name;
};

const closeModal = () => {
    isShowModal.value = false;
};

const closeModalChangeSeat = () => {
    isModalChangeSeat.value = false;
};

const createUserSeat = async (data_user) => {
    try {
        loading.value = true;
        const { data, error } = await client.from("user_seats").insert({
            id_user: data_user.id,
            seat_code: data_user.seat_code,
            is_seated: 1,
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
    loading.value = true;
    if (user_delegate?.full_name) {
        await createUserSeat(user_delegate);
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
                        seat_code: seatCodeSelect.value,
                        name: `${positionValue.value} ${fullNameValue.value}`,
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

    const { data: userSeated } = await client.from("user_seats").select("*");
    seatedState.value = userSeated || [];
    closeModal();
    return;
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

const handleChangeSeat = async () => {
    try {
        loadingChangeSeat.value = true;
        if (!seatCodeValue.value) {
            return $swal.fire({
                text: "Nhập vị trí!",
                icon: "info",
            });
        }

        // Check seat is existed
        const { data: seatResponse, error } = await client
            .from("seats")
            .select("*")
            .eq("seat_code", seatCodeValue.value);

        if (!seatResponse.length || error) {
            return $swal.fire({
                text: "Vị trí ghế không tồn tại!",
                icon: "error",
            });
        }

        // Check seat is existed in user
        const { data: userResponse } = await client
            .from("users")
            .select("*")
            .eq("seat_code", seatCodeValue.value);

        const userSwapped = userResponse[0];
        await client
            .from("users")
            .update({
                seat_code: seatCodeValue.value,
            })
            .eq("id", infoDelegate.value?.id);

        if (userSwapped && userSwapped?.id !== infoDelegate.value?.id) {
            await client
                .from("users")
                .update({
                    seat_code: infoDelegate.value?.seat_code,
                })
                .eq("id", userSwapped?.id);
        }

        const { data: users } = await client.from("users").select("*");
        usersState.value = users;

        const { data: userSeated } = await client
            .from("user_seats")
            .select("*");
        seatedState.value = userSeated || [];

        closeModalChangeSeat();
        closeModal();
        seatCodeValue.value = "";
        return $swal.fire({
            text: "Thay đổi vị trí thành công!",
            icon: "success",
        });
    } catch (error) {
        return $swal.fire({
            text: "Thay đổi vị trí thất bại!",
            icon: "error",
        });
    } finally {
        loadingChangeSeat.value = false;
    }
};
</script>

<template>
    <div :class="seatClass" class="grid grid-cols-3">
        <div v-for="col in column" :key="col">
            <p class="text-center text-sm">{{ col }}</p>
            <button
                v-if="col"
                class="px-2 w-full flex-shrink-0 py-6 cursor-pointer hover:opacity-80 border-r border-[#DFDFDF] relative"
                :data-id="col"
                :class="[
                    isHasUserSeat(col, seatedState) ||
                    selectSeatId?.seat_code == col
                        ? 'bg-amber-400'
                        : 'bg-red-500',
                ]"
                :style="seatStyle"
                @click="handleSelectSeat(col)"
            >
                <p class="whitespace-nowrap absolute top-0 right-0">
                    <Icon
                        v-if="isHasUserSeat(col, seatedState)"
                        name="lets-icons:check-fill"
                        class="text-xl text-green-400"
                    />
                </p>
            </button>

            <div
                v-else
                class="w-full flex-shrink-0 py-6"
                :style="seatStyle"
            ></div>
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
                        <div v-if="infoDelegate?.full_name">
                            <input
                                ref="inputName"
                                v-model="valueName"
                                class="w-full outline-none text-sm lg:text-lg md:text-3xl text-[#8B8B8B] mb-10"
                                type="text"
                            />

                            <button
                                v-if="
                                    isHasUserSeat(seatCodeSelect, seatedState)
                                "
                                class="px-[20px] inline-flex items-center gap-2 rounded-md py-1 md:py-2 text-base bg-[#962400] text-white hover:opacity-80"
                                @click="handleDeleteSeat(infoDelegate)"
                            >
                                <Icon v-if="loading" name="eos-icons:loading" />
                                Hủy chỗ
                            </button>

                            <button
                                v-else
                                class="px-[20px] inline-flex items-center gap-2 rounded-md py-1 md:py-2 text-base bg-[#FFC700] text-white hover:opacity-80"
                                @click="handleRegisterSeat(infoDelegate)"
                            >
                                <Icon v-if="loading" name="eos-icons:loading" />
                                Đặt chỗ
                            </button>

                            <button
                                v-if="
                                    !isHasUserSeat(seatCodeSelect, seatedState)
                                "
                                class="px-[20px] inline-flex ml-2 items-center gap-2 rounded-md py-1 md:py-2 text-base bg-green-400 text-white hover:opacity-80"
                                @click="isModalChangeSeat = true"
                            >
                                Đổi chỗ
                            </button>
                        </div>

                        <!-- START FORM DELEGATE -->
                        <div
                            v-else
                            class="grid grid-cols-1 lg:grid-cols-2 gap-[20px]"
                        >
                            <div>
                                <label
                                    for="countries"
                                    class="block mb-2 text-lg text-[#962400] font-bold"
                                >
                                    Họ và tên
                                </label>
                                <div>
                                    <input
                                        ref="inputSearch"
                                        v-model="fullNameValue"
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                        type="text"
                                        placeholder="Họ và tên"
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
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                    >
                                        <option value="" selected>
                                            Vui lòng chọn...
                                        </option>
                                        <option
                                            value="1"
                                            selected
                                            class="text-black"
                                        >
                                            Nam
                                        </option>
                                        <option value="0" class="text-black">
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
                                    class="block mb-2 text-lg text-[#962400] font-bold"
                                >
                                    Cấp bật
                                </label>
                                <div>
                                    <input
                                        ref="inputSearch"
                                        v-model="rankValue"
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                        type="text"
                                        placeholder="Vui lòng nhập cấp bật"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="countries"
                                    class="block mb-2 text-lg text-[#962400] font-bold"
                                >
                                    Chức vụ
                                </label>
                                <div>
                                    <input
                                        ref="inputSearch"
                                        v-model="positionValue"
                                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                        type="text"
                                        placeholder="Vui lòng nhập chức vụ"
                                    />
                                </div>
                            </div>

                            <div class="lg:col-span-2">
                                <button
                                    class="px-[20px] inline-flex items-center gap-2 rounded-md py-1 md:py-2 text-base bg-[#FFC700] text-white hover:opacity-80"
                                    @click="handleRegisterSeat(infoDelegate)"
                                >
                                    <Icon
                                        v-if="loading"
                                        name="eos-icons:loading"
                                    />
                                    Đặt chỗ
                                </button>

                                <button
                                    class="px-[20px] inline-flex ml-2 items-center gap-2 rounded-md py-1 md:py-2 text-base bg-green-400 text-white hover:opacity-80"
                                    @click="isModalChangeSeat = true"
                                >
                                    <Icon v-if="loadingChangeSeat" name="eos-icons:loading" />
                                    Đổi chỗ
                                </button>
                            </div>
                        </div>
                        <!-- END FORM DELEGATE -->
                    </div>
                </div>
            </Modal>
        </Transition>

        <!-- MODEL CHANGE SEAT -->
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="transform opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
        >
            <Modal v-if="isModalChangeSeat" @close="closeModalChangeSeat()">
                <div
                    class="py-4 h-full flex items-center justify-center relative overflow-hidden"
                    @click.self="closeModalChangeSeat"
                >
                    <button
                        class="absolute top-2 right-2 w-[40px] h-[40px] rounded-full hover:bg-[#CE7A58]/20 flex justify-center items-center"
                        @click="closeModalChangeSeat()"
                    >
                        <IconClose />
                    </button>
                    <div
                        class="bg-white w-full md:max-w-[300px] rounded-lg h-fit py-10 mx-3 lg:mx-20 px-4"
                    >
                        <form @submit.prevent="">
                            <div>
                                <input
                                    v-model="seatCodeValue"
                                    class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative"
                                    type="text"
                                    placeholder="Nhập vị trí ghế"
                                />
                                <button
                                    class="px-[20px] inline-flex mt-3 items-center gap-2 rounded-md py-1 md:py-2 text-base bg-[#FFC700] text-white hover:opacity-80"
                                    @click="handleChangeSeat"
                                >
                                    <Icon
                                        v-if="loadingChangeSeat"
                                        name="eos-icons:loading"
                                    />
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.seat {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 16px;
}
.seat-yellow {
    background-color: yellow;
}
.seat-red {
    background-color: red;
}
.seat-blue {
    background-color: blue;
}
</style>
