<template>
    <div class="my-2 px-1 flex gap-10 w-full justify-center" v-if="postObject">
        <div class="flex flex-col gap-5">
            <div class="bg-slate-100 px-10 py-4 rounded-lg w-[700px] ">
                <div class="m-auto">
                    <h1 class="text-center text-4xl">{{ postObject.title }}</h1>
                    <br/>
                    <hr/>
                    <br/>
                </div>
                <div class="m-auto">
                    <article v-html="postObject.content" class="prose"></article>
                </div>
            </div>
            <CommentBox :postId="postObject.id"/>
        </div>
        <div
            class="hidden h-20 w-[200px] flex-shrink md:block"
            id="sidebar">
            <UserSidebar v-if="authorObject" v-bind="authorObject" :disableUpload="true" />
            <GameSidebar v-if="gameObject" v-bind="gameObject"/>
            <Advertisement />
            
        </div>
    </div>
</template>

<script setup>
const { postId } = useRoute().params;
const postObject = ref(null);
const gameObject = ref(null);
const authorObject = ref(null);

onMounted(async () => {
    const postRef = new doc(myDb(), `posts/${postId}`);
    const fbPost = await getDoc(postRef);
    if (fbPost.data() == null){
        throw createError({
            statusCode: 404,
            statusMessage: "Post not Found",
            fatal: true,
        });
    }
    postObject.value = postConverter.fromFirestore(fbPost)
    gameObject.value = gameConverter.fromFirestore(await(getDoc(postObject.value.game)));
    authorObject.value = userConverter.fromFirestore(await (getDoc(postObject.value.author)));

});
</script>

<style scoped></style>
