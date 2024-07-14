<template>
    <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
        <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
            {{ item?.name }}
        </th>
        <td class="px-6 py-4">{{ item?.full_name }}</td>
        <td class="px-6 py-4">{{ item?.seat_code }}</td>
        <td class="px-6 py-4">
            <p v-if="item?.user" class="whitespace-nowrap">
                <Icon
                    name="lets-icons:check-fill"
                    class="text-xl text-green-400"
                />
            </p>
        </td>
        <td class="px-6 py-4 text-right">
            <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="handleSelectSeat(item)"
            >
                <Icon name="tabler:edit" size="22" />
            </button>
        </td>
    </tr>

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
                    <div v-if="item?.full_name">
                        <p
                            class="w-full outline-none text-sm lg:text-lg md:text-3xl text-[#8B8B8B] mb-10"
                        >
                            {{ item?.name }}
                        </p>

                        <button
                            v-if="item?.user"
                            class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#962400] text-white hover:opacity-80"
                            @click="handleDeleteSeat(item)"
                        >
                            <Icon v-if="loading" name="eos-icons:loading" />
                            Hủy chỗ
                        </button>

                        <button
                            v-else
                            class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#FFC700] text-white hover:opacity-80"
                            @click="handleRegisterSeat(item)"
                        >
                            <Icon v-if="loading" name="eos-icons:loading" />
                            Đặt chỗ
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
                                class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#FFC700] text-white hover:opacity-80"
                                @click="handleRegisterSeat(item)"
                            >
                                <Icon v-if="loading" name="eos-icons:loading" />
                                Đặt chỗ
                            </button>
                        </div>
                    </div>
                    <!-- END FORM DELEGATE -->
                </div>
            </div>
        </Modal>
    </Transition>
</template>

<script setup>
const { $swal } = useNuxtApp();
const client = useSupabaseClient();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});

const emits = defineEmits(["resetData"]);

const isShowModal = ref(false);
const loading = ref(false);
const fullNameValue = ref("");
const genderValue = ref("");
const rankValue = ref("");
const positionValue = ref("");

const handleSelectSeat = (value) => {
    isShowModal.value = true;
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
            }

            if (error) {
                const { data, error: errorCreate } = await client
                    .from("users")
                    .insert({
                        full_name: fullNameValue.value,
                        gender: genderValue.value,
                        rank: rankValue.value,
                        position: positionValue.value,
                        seat_code: user_delegate?.seat_code,
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
                }
            }
        }
    }
    emits("resetData");
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
        emits("resetData");
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
</script>

<style lang="scss" scoped></style>
