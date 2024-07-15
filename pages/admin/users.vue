<script setup>
import _ from "lodash";
import units from "~/assets/data/unit.js";

definePageMeta({
    middleware: "auth",
    layout: "admin",
});

const client = useSupabaseClient();

const dataUsers = ref([]);
const selectAgency = ref(null);
const inputSearch = ref(null);
const valueSearch = ref("");
const dataSearchName = ref([]);
const isShowDataSearch = ref(false);

const { data, refresh, loading } = useAsyncData("users", async () => {
    const { data } = await client.from("users").select(`*, user_seats(*)`);
    return data;
});

dataUsers.value = data.value;

const handleSearchSubmit = () => {
    if (valueSearch.value) {
        dataUsers.value = data.value.filter((item) => {
            return item.id === selectAgency.value?.id;
        });
    } else {
        dataUsers.value = data.value
    }
};

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

const handleSelect = (item) => {
    valueSearch.value = item.name;
    selectAgency.value = item;
    isShowDataSearch.value = false;
};

const handleResetData = () => {
    refresh();
};

const handleResetSearch = () => {
    valueSearch.value = "";
    selectAgency.value = null;
    isShowDataSearch.value = false;
};

watch(data, () => {
    dataUsers.value = data.value;
});
</script>

<template>
    <div class="mt-24 px-6">
        <h2
            class="text-2xl font-bold text-[#FFC700] text-center uppercase mb-4"
        >
            Danh sách Cơ quan, tổ chức, cá nhân
        </h2>

        <div class="relative">
            <div class="flex mb-3 gap-3">
                <div
                    class="block text-[#8B8B8B] w-1/3 py-[8px] bg-white shadow-md border border-[#ACACAC] rounded-[10px] outline-none px-6 relative text-center"
                    @click="handleFocusInput"
                >
                    <input
                        ref="inputSearch"
                        v-model="valueSearch"
                        class="w-full outline-none text-lg text-[#8B8B8B]"
                        type="text"
                        placeholder="Tìm kiếm theo tên cơ quan, tổ chức cá nhân... "
                        @input="handleSearch"
                        @blur="handleBlurInput"
                    />
                    <button
                        v-if="valueSearch"
                        type="button"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl flex items-center justify-center"
                        @click="handleResetSearch"
                    >
                        <Icon name="carbon:close-outline" />
                    </button>
                    <ul
                        v-if="
                            dataSearchName?.length > 0 &&
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

                <button
                    class="rounded-lg py-2 px-4 flex items-center font-bold justify-center text-[#962400] border border-[#962400] hover:bg-[#962400] hover:text-white"
                    @click="handleSearchSubmit"
                >
                    Tìm kiếm
                </button>

                <button
                    class="rounded-lg py-2 px-4 flex font-bold items-center justify-center text-[#FFC700] border border-[#FFC700] hover:bg-[#FFC700] hover:text-white"
                    @click="handleResetData"
                >
                    <Icon name="system-uicons:reset" />
                </button>
            </div>
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto border-collapse border border-slate-500"
            >
                <AdminTableHeader
                    :items="[
                        { id: 1, label: 'Chức vụ' },
                        {
                            id: 2,
                            label: 'Tên',
                        },
                        {
                            id: 3,
                            label: 'Số điện thoại',
                        },
                        {
                            id: 4,
                            label: 'Vị trí ngồi',
                        },
                        {
                            id: 5,
                            label: 'Checkin',
                            align: 'center',
                        },
                        {
                            id: 6,
                            label: 'Xác nhận tham gia',
                            align: 'center',
                        },
                        {
                            id: 7,
                            label: '',
                        },
                    ]"
                />
                <tbody>
                    <AdminTableRow
                        v-for="item in dataUsers"
                        :key="item?.id"
                        :item="{
                            id: item?.id,
                            name: item?.name,
                            full_name: item?.full_name,
                            seat_code: item?.seat_code,
                            user: item?.user_seats,
                        }"
                        @reset-data="handleResetData"
                    />
                    <AdminTableRowLoading v-if="loading" />
                    <AdminTableRowEmpty v-if="!dataUsers?.length" />
                </tbody>
            </table>
        </div>
        <!-- Modal -->
    </div>
</template>

<style lang="scss" scoped></style>
