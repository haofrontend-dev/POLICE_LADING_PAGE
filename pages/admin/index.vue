<template>
    <div class="bg-white py-4 h-auto relative">
        <div class="mt-10 px-6">
            <h2 class="text-2xl font-bold text-[#FFC700] text-center uppercase">
                TÌM KIẾM CHỖ NGỒI
            </h2>
            <form
                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px]"
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
                        class="block text-[#8B8B8B] w-full py-[13px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative text-center"
                        @click="handleFocusInput"
                    >
                        <input
                            ref="inputSearch"
                            v-model="valueSearch"
                            class="md:w-1/2 outline-none text-lg text-[#8B8B8B]"
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
                        class="px-[43px] h-full rounded-md py-3 text-lg bg-[#962400] text-white hover:opacity-80 inline-flex items-center gap-2"
                        @click="handleSearchSeat"
                        type="button"
                    >
                        <Icon v-if="loading" name="eos-icons:loading" />
                        Xác nhận tham gia
                    </button>
                </div>
            </form>

            <AdminSeatingChart :seat-id="selectedSeatDara" />
        </div>
    </div>
</template>

<script setup>
import _ from "lodash";
import units from "~/assets/data/unit.js";

definePageMeta({
    middleware: "auth",
    layout: "admin",
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

const selectDelegate = ref("");
const selectUnit = ref(null);
const selectAgency = ref(null);
const inputSearch = ref(null);
const valueSearch = ref("");
const dataSearchName = ref([]);
const isShowDataSearch = ref(false);
const selectedSeatDara = ref(null);
const loading = ref(false);

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

const handleSelect = (item) => {
    valueSearch.value = item.name;
    selectAgency.value = item;
    isShowDataSearch.value = false;
};

const handleSearchSeat = () => {
    loading.value = true;
    setTimeout(() => {
        selectedSeatDara.value = selectAgency.value;
        loading.value = false;
        $swal.fire({
            title: selectAgency.value.name,
            text: "Ngồi hàng ghế " + selectAgency.value.seat_code,
        });
    }, 1000);
};
</script>

<style lang="scss" scoped></style>
