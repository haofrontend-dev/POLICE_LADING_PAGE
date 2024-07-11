<template>
    <div class="mt-[81px] mb-10 overflow-x-auto py-[100px]">
        <div class="flex gap-10 min-w-[2000px] ">
            <div class="maket-left w-[500px] flex-shrink-0">
                <div
                    class="bg-sky-400 text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <SeatingChartSeat
                        v-for="(seat, index) in leftSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>
            </div>
            <div class="maket-middle flex-1 min-w-[1200px] flex-shrink-0">
                <div
                    class="bg-[#FFC700] text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET LỄ
                </div>

                <div class="grid grid-cols-7 gap-4 mt-4">
                    <SeatingChartSeat
                        v-for="(seat, index) in leftSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>
            </div>
            <div class="matket-right w-[500px] flex-shrink-0">
                <div
                    class="bg-sky-400 text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <SeatingChartSeat
                        v-for="(seat, index) in leftSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    seatId: String,
});

const selectedSeat = ref([]);
const leftSeats = ref([
    { id: "C101", row: 0, column: ["1", "2", "3"], color: "yellow" },
    { id: "C101", row: 0, column: ["4", "5", "6"], color: "yellow" },
    { id: "C201", row: 0, column: ["7", "8", "9"], color: "yellow" },
    { id: "C201", row: 0, column: ["10", "11", "12"], color: "yellow" },
]);
const rightSeats = ref([]);
const middleSeats = ref([
    { id: "A301", row: 0, column: ["1", "2", "3"], color: "yellow" },
]);

onMounted(() => {
    const maketLeft = document.querySelector(".maket-left");
    const maketMiddle = document.querySelector(".maket-middle");
    const maketRight = document.querySelector(".matket-right");
});
</script>

<style lang="scss" scoped></style>
