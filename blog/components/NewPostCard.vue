<template>
    <div
        class="rounded-lg border border-gray-300 shadow-sm bg-slate-200 px-3 py-3 my-3 flex gap-3">
        <div>
            <NuxtLink href="/posts/new">
                New
            </NuxtLink>
        </div>
        <div>
            <NuxtLink :href="`/posts/users/${ props.uuid }/`">
                Posts
            </NuxtLink>
        </div>
        <div>
            <NuxtLink :href="`/posts/users/${ props.uuid }/liked`">
                Liked
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['uuid'])

</script>

<style scoped>

</style>