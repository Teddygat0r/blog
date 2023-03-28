<template>
    <div class="flex p-3">
        <div class="flex-none" v-if="userObject">
            <img
                :src="userObject.profile_picture"
                class="w-16 rounded-full border-2 border-gray-700 border-opacity-50" />
        </div>
        <div class="mx-2 w-full border-solid border-slate-300 px-2">
            <div class="mb-2 flex gap-2">
                <h2 class="m-auto text-sm font-bold"></h2>

                <h3 class="m-auto text-xs font-light text-opacity-50"></h3>
            </div>
            <div class="w-full">
                <input
                    placeholder="Add a comment..."
                    class="text-md w-full rounded-md p-2"
                    @click="commentOpened = true"
                    v-model="commentContent" />
                <div class="flex justify-end" v-if="commentOpened">
                    <button
                        class="mt-2 rounded-full py-2 px-4 hover:bg-slate-300">
                        Cancel
                    </button>
                    <button
                        class="mt-2 rounded-full bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-600"
                        :disabled="commentContent === ''" @click="postComment">
                        Comment
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Timestamp, addDoc } from "@firebase/firestore";
import { arrayUnion } from '@firebase/firestore';
import sanitizeHtml from "sanitize-html";

const commentContent = ref("");
const userObject = ref(null);
const commentOpened = ref(false);
const props = defineProps({
    postId: String,
});


const getUserData = async () => {
    const userDoc = doc(myDb(), "users", myAuth().currentUser.uid);
    userObject.value = userConverter.fromFirestore(await getDoc(userDoc));
};

const postComment = async () => {
    //Adds comment to database
    const commentRef = await addDoc(collection(myDb(), "comments"), {
        author: doc(myDb(), "users", myAuth().currentUser.uid),
        content: sanitizeHtml(commentContent.value),
        date: Timestamp.fromMillis(Date.now()),
        post: doc(myDb(), "posts", props.postId),
    });

    //Adds comment to post comment list
    await updateDoc(doc(myDb(), "posts", props.postId), {
        comments: arrayUnion(doc(myDb(), "comments", commentRef.id))
    });
};

onMounted(async () => {
    await getUserData();
});
</script>

<style scoped></style>
