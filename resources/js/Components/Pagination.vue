

<template>
 
  <div class="flex gap-3">

 
  <div>
    <label for="pageSize" class="mr-2">Page Size:</label>
    <select @change="updatePageSize" v-model="pageSize"  id="pageSize" class="p-2 border rounded">
      <option v-for="size in pageSizes"  :key="size" :value="size">{{ size }}</option>
    </select>
  </div>
<div>
  
  <p>
        {{ calculateStartIndex(datas.current_page, props.size) }}-
        {{ calculateEndIndex(datas.current_page, props.size, datas.total) }}
        /{{ datas.total }}
      </p>

</div>
 
  <div v-if="links.length">
    <div class="flex flex-wrap -mb-1">
      <template v-for="(link, key) in links" :key="key">
        <div v-if="link.url === null" class="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded" v-html="link.label" />
        <Link
          v-else
          class="mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-white border focus:border-indigo-500 rounded"
          :class="{ 'bg-white': link.active }"
          :href="appendSizeToUrl(link.url, props.size)"
          v-html="link.label"
        />
      </template>
    </div>
  </div>

</div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { ref } from "vue";
const pageSizes = [5,10,15];

const props = defineProps({
    links: Array,
    datas:Object,
    size:Number
});
const pageSize = ref(props.size);
const emit = defineEmits(["changePageSize"]);

const updatePageSize = () => {

  emit("changePageSize", pageSize.value);
}

const calculateStartIndex = (currentPage, pageSize) => {

  return (currentPage- 1) * pageSize + 1;
};

const calculateEndIndex = (currentPage, pageSize, total) => {
  const endIndex = currentPage * pageSize;
  return endIndex > total ? total : endIndex;
};

const appendSizeToUrl = (url, pageSize) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}size=${pageSize}`;
};
</script>

<style scoped>

</style>
