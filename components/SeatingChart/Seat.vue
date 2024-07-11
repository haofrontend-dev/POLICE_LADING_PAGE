<template>
    <div :class="seatClass" class="grid grid-cols-3" @click="selectSeat">
        <div
            v-for="col in column"
            :key="col"
            class="px-4 w-full flex-shrink-0 py-6 cursor-pointer hover:opacity-80"
            :class="[
                listSteatSelected?.includes(col) || selectSeatId == col
                    ? 'bg-amber-400'
                    : 'bg-red-500',
            ]"
            :style="seatStyle"
            @click="handleSelectSeat(col)"
        >
            <p class="whitespace-nowrap text-xs text-white">Đại biểu</p>
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
                    <div class="bg-white w-2/3 h-56 py-10 px-20">
                        <input
                            ref="inputName"
                            v-model="valueName"
                            class="w-full outline-none text-3xl text-[#8B8B8B] mb-10"
                            disabled
                            type="text"
                        />
                        <button
                            class="px-[43px] inline-block rounded-md py-3 text-lg bg-[#962400] text-white hover:opacity-80"
                            @click="handleRegisterSeat"
                        >
                            Đặt chỗ
                        </button>
                    </div>
                </div>
            </Modal>
        </Transition>
    </div>
</template>

<script setup>
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

const seatClass = computed(() => {
    return "seat";
});

const seatStyle = computed(() => {
    return {
        ...props.styleRow,
    };
});

const selectSeat = () => {
    // handle seat selection if needed
    console.log(`Seat ${props.id} selected`);
};

const handleSelectSeat = (value) => {
    isShowModal.value = true;
    infoDelegate.value = getNameSeat(value);
    valueName.value = infoDelegate.value.name;
};

const closeModal = () => {
    isShowModal.value = false;
};

const handleRegisterSeat = () => {
    listSteatSelected.value.push(infoDelegate.value.value.toString());
    setStorage("seats_selected", listSteatSelected.value);
    closeModal();
}

onMounted(() => {
    listSteatSelected.value = getStorage("seats_selected") || [];
    console.log(listSteatSelected.value);
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
