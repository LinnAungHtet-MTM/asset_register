<script setup>
const props = defineProps({
    posts: [],
});
</script>

<template>
    <div v-for="post in posts" :key="post.id">
        <img :src="post.img" width="200" height="200" alt="hello" />
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
    </div>
</template>

<style></style>
