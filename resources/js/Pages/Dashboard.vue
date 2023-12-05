<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import TeleportModal from "@/Components/TeleportModal.vue";
import { Head } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";

const props = defineProps({
    errors: {},
    datas: Array,
});

const registerForm = useForm({
    code: "",
    asset_name: "",
});

const updateForm = useForm({
    code: "",
    asset_name: "",
});

// const list = async (page = 1) => {
//     await axios
//         .get(`/api/users?page=${page}`)
//         .then(({ data }) => {
//             this.users = data;
//         })
//         .catch(({ response }) => {
//             console.error(response);
//         });
// };

let showModal = ref(false);
let productId = ref();

const destroyModal = () => {
    showModal.value = false;
};

const handleSubmit = () => {
    router.post("/dashboard", registerForm);
    registerForm.code = "";
    registerForm.asset_name = "";
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
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-sm mx-auto sm:px-6 lg:px-8">
                <form
                    @submit.prevent="handleSubmit"
                    class="mx-auto shadow bg-white p-6 rounded"
                >
                    <div class="mb-5">
                        <label
                            for="code"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Code</label
                        >
                        <input
                            v-model="registerForm.code"
                            type="text"
                            id="code"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p class="text-red-600 text-sm">
                            {{ props.errors.code }}
                        </p>
                    </div>
                    <div class="mb-5">
                        <label
                            for="asset_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Asset Name</label
                        >
                        <input
                            v-model="registerForm.asset_name"
                            type="text"
                            id="asset_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p class="text-red-600 text-sm">
                            {{ props.errors.asset_name }}
                        </p>
                    </div>
                    <button
                        @click="btnText === 'Edit' ? updateAsset() : ''"
                        type="submit"
                        class="text-white block mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>

        <div class="relative overflow-x-auto">
            <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th scope="col" class="px-6 py-3">Code</th>
                        <th scope="col" class="px-6 py-3">Asset Name</th>
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
        </div>
        <Teleport to="body">
            <TeleportModal :show="showModal">
                <template #header>
                    <h2>Edit Form</h2>
                </template>
                <template #body>
                    <form @submit.prevent="handleSubmit" class="mx-auto">
                        <div class="mb-5">
                            <label
                                for="code"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Code</label
                            >
                            <input
                                v-model="updateForm.code"
                                type="text"
                                id="code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <p class="text-red-600 text-sm">
                                {{ props.errors.code }}
                            </p>
                        </div>
                        <div class="mb-5">
                            <label
                                for="asset_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Asset Name</label
                            >
                            <input
                                v-model="updateForm.asset_name"
                                type="text"
                                id="asset_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <p class="text-red-600 text-sm">
                                {{ props.errors.asset_name }}
                            </p>
                        </div>
                    </form>
                </template>
                <template #footer>
                    <div class="flex justify-center items-center gap-2">
                        <button
                            @click="destroyModal"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Cancel
                        </button>
                        <button
                            @click="updateAsset"
                            type="submit"
                            class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Update
                        </button>
                    </div>
                </template>
            </TeleportModal>
        </Teleport>
        <div class="mt-8 px-4">
            <Pagination :links="props.datas.links" />
        </div>
    </AuthenticatedLayout>
</template>
