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
                    <AdminSeatingChartSeat
                        v-for="(seat, index) in leftSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>

                <div class="mt-20">
                    <div
                        class="border border-gray-500 px-4 py-2 uppercase text-base text-center md:text-lg font-semibold"
                    >
                        <span class="text-[#962400]">Khán đài C </span>
                    </div>
                </div>
            </div>
            <div class="maket-middle flex-1 min-w-[1400px] flex-shrink-0">
                <div
                    class="bg-[#FFC700] text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET LỄ
                </div>

                <div class="grid grid-cols-7 gap-4 mt-4">
                    <AdminSeatingChartSeat
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
                    <AdminSeatingChartSeat
                        v-for="(seat, index) in middleBottomSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>

                <div class="mt-20">
                    <div
                        class="border border-gray-500 px-4 py-2 uppercase text-base text-center md:text-lg font-semibold"
                    >
                        <span class="text-[#962400]">Khán đài A </span>
                    </div>
                </div>
            </div>
            <div class="matket-right w-[400px] flex-shrink-0">
                <div
                    class="bg-sky-400 text-gray-900 text-center py-2 text-lg font-bold"
                >
                    MAKET
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <AdminSeatingChartSeat
                        v-for="(seat, index) in rightSeats"
                        :key="index"
                        :id="seat.id"
                        :row="seat.row"
                        :column="seat.column"
                        :color="seat.color"
                        :selectSeatId="seatId"
                    />
                </div>

                <div class="mt-20">
                    <div
                        class="border border-gray-500 px-4 py-2 uppercase text-base text-center md:text-lg font-semibold"
                    >
                        <span class="text-[#962400]">Khán đài B </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    seatId: {
        type: Object,
        default: () => ({}),
    },
});

const leftSeats = ref([
    { id: "C301", row: 0, column: ["C306", "C305", "C304"], color: "yellow" },
    { id: "C302", row: 0, column: ["C303", "C302", "C301"], color: "yellow" },
    { id: "C201", row: 0, column: ["C206", "C205", "C204"], color: "yellow" },
    { id: "C202", row: 0, column: ["C203", "C202", "C201"], color: "yellow" },
    { id: "C101", row: 0, column: ["C106", "C105", "C104"], color: "yellow" },
    { id: "C102", row: 0, column: ["C103", "C102", "C101"], color: "yellow" },
]);

const rightSeats = ref([
    { id: "C101", row: 0, column: ["B306", "B305", "B304"], color: "yellow" },
    { id: "C101", row: 0, column: ["B303", "B302", "B301"], color: "yellow" },
    { id: "C201", row: 0, column: ["B206", "B205", "B204"], color: "yellow" },
    { id: "C201", row: 0, column: ["B203", "B202", "B201"], color: "yellow" },
    { id: "C201", row: 0, column: ["B106", "B105", "B104"], color: "yellow" },
    { id: "C201", row: 0, column: ["B103", "B102", "B101"], color: "yellow" },
]);
const middleSeats = ref([
    { id: "A301", row: 0, column: ["A321", "A320", "A319"], color: "yellow" },
    { id: "A302", row: 0, column: ["A318", "A317", "A316"], color: "yellow" },
    { id: "A303", row: 0, column: ["A315", "A314", "A313"], color: "yellow" },
    { id: "A304", row: 0, column: ["A312", "A311", "A310"], color: "yellow" },
    { id: "A305", row: 0, column: ["A309", "A308", "A307"], color: "yellow" },
    { id: "A306", row: 0, column: ["A306", "A305", "A304"], color: "yellow" },
    { id: "A307", row: 0, column: ["A303", "A302", "A301"], color: "yellow" },
    { id: "A201", row: 0, column: ["A221", "A220", "A219"], color: "yellow" },
    { id: "A202", row: 0, column: ["A218", "A217", "A216"], color: "yellow" },
    { id: "A203", row: 0, column: ["A215", "A214", "A213"], color: "yellow" },
    { id: "A204", row: 0, column: ["A212", "A211", "A210"], color: "yellow" },
    { id: "A205", row: 0, column: ["A209", "A208", "A207"], color: "yellow" },
    { id: "A206", row: 0, column: ["A206", "A205", "A204"], color: "yellow" },
    { id: "A207", row: 0, column: ["A203", "A202", "A201"], color: "yellow" },
]);

const middleBottomSeats = ref([
    { id: "A101", row: 0, column: ["A116", "A115", "A114"], color: "yellow" },
    { id: "A102", row: 0, column: ["A113", "A112", "A111"], color: "yellow" },
    { id: "A103", row: 0, column: ["A110", "", "A109"], color: "yellow" },
    { id: "A104", row: 0, column: ["A108", "", "A107"], color: "yellow" },
    { id: "A105", row: 0, column: ["A106", "A105", "A104"], color: "yellow" },
    { id: "A106", row: 0, column: ["A103", "A102", "A101"], color: "yellow" },
]);

const scrollIntoViewHorizontally = (container, child) => {
    const child_offsetRight = child.offsetLeft + child.offsetWidth;
    const container_scrollRight = container.scrollLeft + container.offsetWidth;
    if (container.scrollLeft > child.offsetLeft) {
        container.scrollLeft = child.offsetLeft;
    } else if (container_scrollRight < child_offsetRight) {
        container.scrollLeft += child_offsetRight - container_scrollRight;
    }
};

watch(
    () => props.seatId,
    (newValue) => {
        if (newValue) {
            const seatElement = document.getElementById(newValue?.seat_code);
            if (seatElement) {
                const parentSeatElement = document.getElementById("seating");
                scrollIntoViewHorizontally(parentSeatElement, seatElement);
            }
        }
    }
);
</script>

<style lang="scss" scoped></style>
