<template>
    <div class="flex">
        <div class="flex m-auto gap-10">
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
    </div>
</template>

<script setup>

const postObjects = ref([])

onMounted(async () => {    
    const q = query(collection(myDb(), "posts"))
    const querySnapshot = await getDocs(q)
    
    let fbPosts = []
    querySnapshot.forEach(async (doc) => {
        const docData = postConverter.fromFirestore(doc)
        fbPosts.push(docData)
    })

    //Sorts posts by date
    fbPosts.sort((a, b) => {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0)})

    postObjects.value = fbPosts
})


</script>

<style scoped></style>
