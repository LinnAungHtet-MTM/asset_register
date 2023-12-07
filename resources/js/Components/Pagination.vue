<template>
    <div
        v-if="links.length > 3"
        class="flex flex-wrap justify-center mt-4 space-x-4"
    >
        <Link
            v-for="(link, k) in links"
            :key="k"
            class="px-4 py-3 text-sm leading-4 bg-white rounded focus:text-indigo-500 hover:shadow"
            :class="{ 'bg-indigo-400 text-red-600': link.active }"
            :href="link.url"
            v-html="link.label"
        />
    </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
const props = defineProps({
    links: Array,
});
</script>

<style scoped>
@media (max-width: 767px) {
}
</style>
