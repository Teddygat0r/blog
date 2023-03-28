<template>
    <div class="flex p-3" v-if="authorObject">
        <div class="">
            <NuxtLink :href="`/posts/users/${authorObject.id}`">
                <img
                    :src="authorObject.profile_picture"
                    class="w-16 rounded-full border-2 border-gray-700 border-opacity-50" />
            </NuxtLink>
        </div>
        <div class="mx-2 border-l-2 border-solid border-slate-300 px-2">
            <div class="mb-2 flex gap-2">
                <NuxtLink :href="`/posts/users/${authorObject.id}`">
                    <h2 class="m-auto text-sm font-bold">
                        {{ authorObject.username }}
                    </h2>
                </NuxtLink>
                <h3 class="m-auto text-xs font-light text-opacity-50">
                    {{ convertMillisToAge(comment.date) }}
                </h3>
            </div>
            <div>
                {{ comment.content }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    comment: Object,
});

const authorObject = ref(null);

const fetchCommentAuthor = async () => {
    authorObject.value = userConverter.fromFirestore(
        await getDoc(props.comment.author)
    );
};

onMounted(() => {
    fetchCommentAuthor();
});
</script>

<style scoped></style>
