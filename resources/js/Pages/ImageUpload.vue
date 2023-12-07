<script setup>
import { useForm } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";

const props = defineProps({
    errors: {},
});

const form = useForm({
    title: "",
    content: "",
    img: "",
});

const handleSubmit = () => {
    router.post("/file-upload", form);
};
</script>

<template>
    <div class="py-12">
        <div class="max-w-sm mx-auto sm:px-6 lg:px-8">
            <form
                @submit.prevent="handleSubmit"
                class="mx-auto shadow bg-white p-6 rounded"
            >
                <div class="mb-5">
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Title</label
                    >
                    <input
                        v-model="form.title"
                        type="text"
                        id="title"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p class="text-red-600 text-sm">
                        {{ props.errors.title }}
                    </p>
                </div>
                <div class="mb-5">
                    <label
                        for="content"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Content</label
                    >
                    <input
                        v-model="form.content"
                        type="text"
                        id="content"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p class="text-red-600 text-sm">
                        {{ props.errors.content }}
                    </p>
                </div>
                <div class="mb-5">
                    <label
                        for="image"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Upload</label
                    >
                    <input
                        type="file"
                        name="image"
                        @input="form.img = $event.target.files[0]"
                    />
                    <p class="text-red-600 text-sm">
                        {{ props.errors.img }}
                    </p>
                </div>
                <button
                    type="submit"
                    class="text-white block mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Upload
                </button>
            </form>
        </div>
    </div>
</template>

<style></style>
