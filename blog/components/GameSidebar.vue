<template>
    <div class="flex flex-col rounded-lg border border-gray-300 shadow-sm bg-slate-200 px-3 py-3 my-3 w-full h-fit">
        <NuxtLink class="font-bold text-lg tracking-wide" :href="props.link">{{ props.name }}</NuxtLink>
        <p class="text-sm font-thin opacity-70">Description stuff</p>
    </div>
</template>

<script setup>

const props = defineProps({
    name: String,
    link: String,
})

</script>

<style scoped>

</style>