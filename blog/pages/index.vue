<template>
    <div class="flex mx-5 gap-10">
        <div class="flex-grow min-w-[450px] max-w-[700px]" id="posts">
            <div class="w-full">
                <PostCard v-for="post in postObjects" v-bind="post" :key="post.id">
                    <p>{{ post }}</p>
                </PostCard>
            </div>
        </div>
        <div
            class="flex-shrink min-w-[150px] m-auto hidden md:block h-20"
            id="sidebar">
            <Advertisement />
        </div>
    </div>
</template>

<script setup>

const postObjects = ref([])

onMounted(async () => {    
    const q = query(collection(myDb(), "posts"))
    const querySnapshot = await getDocs(q)
    
    let fbPosts = []
    querySnapshot.forEach(async (doc) => {
        const docData = await postConverter.fromFirestore(doc)
        fbPosts.push(docData)
    })
    postObjects.value = fbPosts
})


</script>

<style scoped></style>
