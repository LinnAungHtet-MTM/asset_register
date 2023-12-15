<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import TeleportModal from "@/Components/TeleportModal.vue";
import { Head } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import dayjs from "dayjs";
import { downloadExcel } from "@/ExcelDownload";



const props = defineProps({
    errors: {},
    datas: Object,
    pageSize: Number
});

const registerForm = useForm({
    code: "",
    asset_class: "",
    asset_name: "",
    units: "",
    acquisition_date: "",
    acquisition_cost: "",
    discount: "",
    net_cost: "",
    dep: "",
    month: "",
    remark: "",

});
const testForm = useForm({
    size: ""
})
const dateform = useForm({
    fromDate: "",
    toDate: "",
});

const updateForm = useForm({
    code: "",
    asset_name: "",
});

const submitDownload = () => {
    downloadExcel(props.datas, dateform.fromDate, dateform.toDate);
};

let showModal = ref(false);
let productId = ref();


const destroyModal = () => {
    showModal.value = false;
};

const handleSubmit = () => {
    router.post("/dashboard", registerForm);
    // registerForm.code = "";
    // registerForm.asset_name = "";
};

const editAsset = (data) => {
    showModal.value = true;
    updateForm.code = data.code;
    updateForm.asset_name = data.asset_name;
    productId.value = data.id;
};

const updateAsset = () => {
    router.put(`/dashboard/edit/${productId.value}`, updateForm);
    updateForm.code = "";
    updateForm.asset_name = "";
    showModal.value = false;
};

const updatePageSize = (data) => {
    testForm.size = data;

    router.get('/office-assets', { size: data })
}
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-sm mx-auto sm:px-6 lg:px-8">
                <form @submit.prevent="handleSubmit">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial
                                Number</label>
                            <input v-model="registerForm.code" type="text" id="company"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ST-000011" required />
                        </div>
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assets
                                Class</label>
                            <input v-model="registerForm.asset_class" type="text" id="company"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Furniture" required />
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assets
                                Name</label>
                            <input v-model="registerForm.asset_name" type="text" id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Table" required />
                        </div>
                        <div>
                            <label for="phone"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units</label>
                            <input v-model="registerForm.units" type="number" id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="1" required />
                        </div>
                        <div>
                            <label for="website"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acquisition
                                Date</label>
                            <input v-model="registerForm.acquisition_date" type="date" id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Brand Name" required />
                        </div>
                        <div>
                            <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acquisition
                                Cost</label>
                            <input v-model="registerForm.acquisition_cost" type="number" id="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>

                        <div>
                            <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deduct(Discount)</label>
                            <input v-model="registerForm.discount" type="number" id="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="" required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Net
                                Cost</label>
                            <input v-model="registerForm.net_cost" type="text" id="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="" required />
                        </div>

                        <div>
                            <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dept%</label>
                            <select v-model="registerForm.dep" id="countries"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="5" selected>5%</option>
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                            </select>
                        </div>

                        <div>
                            <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Financial Month</label>
                            <select v-model="registerForm.month" id="countries"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="6" selected>6</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remark</label>
                        <textarea v-model="registerForm.remark" id="message" rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."></textarea>
                    </div>

                    <div class="mb-6 flex justify-center">
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
            <input v-model="dateform.fromDate" type="date" id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Brand Name" required />
        </div>

        <button
            class="text-white block mt-5 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="submitDownload">
            Download
        </button>

        <div class="mb-5">
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
            <input v-model="dateform.toDate" type="date" id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Brand Name" required />
        </div>

        <!-- <div class="relative overflow-x-auto">
            <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th scope="col" class="px-6 py-3">Code</th>
                        <th scope="col" class="px-6 py-3">Asset Name</th>
                        <th scope="col" class="px-6 py-3">Net Cost</th>
                        <th scope="col" class="px-6 py-3">Dep%</th>
                        <th scope="col" class="px-6 py-3">per Month</th>
                        <th scope="col" class="px-6 py-3">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="data in props.datas.data"
                        :key="data?.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                        <td class="px-6 py-4">{{ data?.code }}</td>
                        <td class="px-6 py-4">{{ data?.asset_name }}</td>
                        <td class="px-6 py-4">{{ data?.Net_cost }}</td>
                        <td class="px-6 py-4">{{ data?.Dep }}</td>
                        <td class="px-6 py-4">{{ data?.per_month }}</td>
                        <td class="px-6 py-4">
                            <button
                                @click="editAsset(data)"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Code</th>
                        <th scope="col" class="px-6 py-3">Asset Name</th>
                        <th scope="col" class="px-6 py-3">Net Cost</th>
                        <th scope="col" class="px-6 py-3">Dep%</th>
                        <th scope="col" class="px-6 py-3">per Month</th>
                        <th scope="col" class="px-6 py-3">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in props.datas.data" :key="data?.depreciation_id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">
                            {{ data?.office_asset?.serial_number }}
                        </td>
                        <td class="px-6 py-4">
                            {{ data?.office_asset?.brand_name }}
                        </td>
                        <td class="px-6 py-4">{{ data?.net_cost }}</td>
                        <td class="px-6 py-4">
                            {{ data?.depreciation_percent }}
                        </td>
                        <!-- <td class="px-6 py-4">{{ data?.asset_name }}</td>
                        <td class="px-6 py-4">{{ data?.Net_cost }}</td>
                        <td class="px-6 py-4">{{ data?.Dep }}</td>
                        <td class="px-6 py-4">{{ data?.per_month }}</td> -->
                        <td class="px-6 py-4">
                            <button @click="editAsset(data)"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Teleport to="body">
            <TeleportModal :show="showModal">
                <template #header>
                    <h2>Edit Form</h2>
                </template>
                <template #body>
                    <form @submit.prevent="handleSubmit" class="mx-auto">
                        <div class="mb-5">
                            <label for="code"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                            <input v-model="updateForm.code" type="text" id="code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <p class="text-red-600 text-sm">
                                {{ props.errors.code }}
                            </p>
                        </div>
                        <div class="mb-5">
                            <label for="asset_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asset Name</label>
                            <input v-model="updateForm.asset_name" type="text" id="asset_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <p class="text-red-600 text-sm">
                                {{ props.errors.asset_name }}
                            </p>
                        </div>
                    </form>
                </template>
                <template #footer>
                    <div class="flex justify-center items-center gap-2">
                        <button @click="destroyModal"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Cancel
                        </button>
                        <button @click="updateAsset" type="submit"
                            class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Update
                        </button>
                    </div>
                </template>
            </TeleportModal>
        </Teleport>
        <div class="mt-8 px-4">
            <Pagination :links="props.datas.links" @changePageSize="updatePageSize" :datas="props.datas"
                :size="props.pageSize" />
        </div>
    </AuthenticatedLayout>
</template>
