<template>
    <div class="w-full rounded-md bg-slate-100">
        <CommentNew v-if="myAuth().currentUser" :postId="postId" />
        <Comment
            v-for="comment in commentList"
            :key="comment.id"
            :comment="comment" />
    </div>
    <button class="" @click="loadComments()">Load More</button>
</template>

<script setup>
import { query, orderBy, limit } from "firebase/firestore";

const commentList = ref([]);
const props = defineProps({
    postId: String,
});

const loadComments = async (lmt = -1) => {
    const postObject = doc(collection(myDb(), "posts"), props.postId);

    const q = (lmt != -1)? 
            query(
                  collection(myDb(), "comments"),
                  where("post", "==", postObject),
                  limit(lmt)
                )
            :  query(
                  collection(myDb(), "comments"),
                  where("post", "==", postObject)
              );
    const querySnapshot = await getDocs(q);

    let fbComments = [];
    querySnapshot.forEach(async (doc) => {
        const docData = commentConverter.fromFirestore(doc);
        fbComments.push(docData);
    });

    commentList.value = fbComments;
};

onMounted(() => {
    loadComments(5);
});
</script>

<style scoped></style>
