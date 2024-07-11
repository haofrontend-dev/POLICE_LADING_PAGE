<template>
    <div :class="seatClass" class="grid grid-cols-3">
        <div v-for="col in column" :key="col">
            <p class="text-center text-sm">{{ col }}</p>
            <button
                v-if="col"
                class="px-2 w-full flex-shrink-0 py-6 cursor-pointer hover:opacity-80 border-r border-[#DFDFDF]"
                :data-="col"
                :class="[
                    listSteatSelected?.includes(col) ||
                    selectSeatId?.seat_code == col
                        ? 'bg-amber-400'
                        : 'bg-red-500',
                    {
                        'cursor-not-allowed': listSteatSelected?.includes(col),
                    },
                ]"
                :disabled="listSteatSelected?.includes(col)"
                :style="seatStyle"
                @click="handleSelectSeat(col)"
            >
                <p class="whitespace-nowrap text-xs text-white"></p>
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
                    <div class="bg-white w-full md:w-2/3 h-56 py-10 px-3 md:px-20">
                        <input
                            ref="inputName"
                            v-model="valueName"
                            class="w-full outline-none text-lg md:text-3xl text-[#8B8B8B] mb-10"
                            disabled
                            type="text"
                        />
                        <button
                            class="px-[43px] inline-flex items-center gap-2 rounded-md py-1 md:py-3 text-lg bg-[#962400] text-white hover:opacity-80"
                            @click="handleRegisterSeat"
                        >
                            <Icon v-if="loading" name="eos-icons:loading" />
                            Đặt chỗ
                        </button>
                    </div>
                </div>
            </Modal>
        </Transition>
    </div>
</template>

<script setup>
const { $swal } = useNuxtApp();

const props = defineProps([
    "id",
    "row",
    "column",
    "status",
    "isSelect",
    "color",
    "styleRow",
    "selectSeatId",
]);

const listSteatSelected = ref([]);
const infoDelegate = ref(null);
const isShowModal = ref(false);
const valueName = ref("");
const loading = ref(false);

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
    infoDelegate.value = getNameSeat(value);
    valueName.value = infoDelegate.value.name;
};

const closeModal = () => {
    isShowModal.value = false;
};

const handleRegisterSeat = () => {
    loading.value = true;
    setTimeout(() => {
        listSteatSelected.value.push(infoDelegate?.value?.seat_code.toString());
        setStorage("seats_selected", listSteatSelected.value);
        loading.value = false;
        closeModal();
        $swal.fire({
            title: "Đặt ghế thành công!",
        });
    }, 1000);
};

onMounted(() => {
    listSteatSelected.value = getStorage("seats_selected") || [];
});
</script>

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
