<template>
    <div class="mt-[81px] mb-10 overflow-x-auto py-[100px]">
        <div class="flex gap-10 min-w-[2000px]">
            <div class="maket-left w-[400px] flex-shrink-0">
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
            <div class="maket-middle flex-1 min-w-[1400px] flex-shrink-0">
                <div
                    class="bg-[#FFC700] text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET LỄ
                </div>

                <div class="grid grid-cols-7 gap-4 mt-4">
                    <SeatingChartSeat
                        v-for="(seat, index) in middleSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>

                <div class="w-11/12 grid gap-4 mt-4 grid-cols-6 mx-auto">
                    <SeatingChartSeat
                        v-for="(seat, index) in middleBottomSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>
            </div>
            <div class="matket-right w-[400px] flex-shrink-0">
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
    { id: "C201", row: 0, column: ["7", "8", "9"], color: "yellow" },
    { id: "C201", row: 0, column: ["10", "11", "12"], color: "yellow" },
]);
const rightSeats = ref([]);
const middleSeats = ref([
    { id: "A301", row: 0, column: ["13", "14", "15"], color: "yellow" },
    { id: "A302", row: 0, column: ["16", "17", "18"], color: "yellow" },
    { id: "A303", row: 0, column: ["19", "20", "21"], color: "yellow" },
    { id: "A304", row: 0, column: ["22", "23", "24"], color: "yellow" },
    { id: "A305", row: 0, column: ["25", "26", "27"], color: "yellow" },
    { id: "A306", row: 0, column: ["28", "29", "30"], color: "yellow" },
    { id: "A307", row: 0, column: ["31", "32", "33"], color: "yellow" },
    { id: "A201", row: 0, column: ["34", "35", "36"], color: "yellow" },
    { id: "A202", row: 0, column: ["37", "38", "39"], color: "yellow" },
    { id: "A203", row: 0, column: ["40", "41", "42"], color: "yellow" },
    { id: "A204", row: 0, column: ["43", "44", "45"], color: "yellow" },
    { id: "A205", row: 0, column: ["46", "47", "48"], color: "yellow" },
    { id: "A206", row: 0, column: ["49", "50", "51"], color: "yellow" },
    { id: "A207", row: 0, column: ["52", "53", "54"], color: "yellow" },
]);

const middleBottomSeats = ref([
    { id: "A101", row: 0, column: ["55", "56", "57"], color: "yellow" },
    { id: "A102", row: 0, column: ["58", "59", "60"], color: "yellow" },
    { id: "A103", row: 0, column: ["61", "", "62"], color: "yellow" },
    { id: "A104", row: 0, column: ["63", "", "64"], color: "yellow" },
    { id: "A105", row: 0, column: ["65", "66", "67"], color: "yellow" },
    { id: "A106", row: 0, column: ["68", "69", "70"], color: "yellow" },
]);

onMounted(() => {
    const maketLeft = document.querySelector(".maket-left");
    const maketMiddle = document.querySelector(".maket-middle");
    const maketRight = document.querySelector(".matket-right");
});
</script>

<style lang="scss" scoped></style>
