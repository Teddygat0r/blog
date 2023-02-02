<template>
    <div
        class="rounded-lg border border-gray-300 shadow-sm bg-slate-200 px-3 py-3 my-3 flex">
        <div class="flex-none flex flex-col align-middle justify-center">
            <button @click="like()">
                <span
                    class="m-auto material-symbols-outlined transition delay-75"
                    :class="liked ? 'active' : ''">
                    favorite
                </span>
            </button>
            <p>{{ likes }}</p>
        </div>
        <div class="m-auto pl-2 ml-2 border-solid border-l-slate-300 border-2">
            <h2 class="font-bold text-2xl tracking-wide px-2">
                {{ props.title }}
            </h2>
            <div class="flex gap-3 justify-between" id="content">
                <p
                    class="font-thin text-sm text-slate-500 px-2 line-clamp-2 max-h-10">
                    {{ props.summary }}
                </p>
            </div>
            <div class="flex justify-between tracking-normal" id="data">
                <div class="flex gap-1 text-xs text-slate-600">
                    <div class="flex">
                        <p class="my-auto mr-1">
                            {{ props.comment_count }} Comments
                        </p>
                        <span class="font-extrabold text-lg">·</span>
                    </div>
                    <div class="my-auto">
                        <p>{{ timeDiff(props.date) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 h-full">
            <img :src="props.image_link" alt="" class="h-16 w-16 mx-auto" />
            <div
                class="flex-none px-2 mx-auto rounded-md border-solid border border-slate-400">
                <p v-if="game" class="text-sm text-slate-700">
                    {{ game.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { arrayUnion, arrayRemove } from '@firebase/firestore';


const liked = ref(false);
const user = myAuth().currentUser;
const props = defineProps({
    title: String,
    summary: String,
    game: Object,
    date: Number,
    likes: Number,
    comment_count: Number,
    image_link: String,
    id: String,
});

const game = ref(null);
const likes = ref(props.likes);
const postsRef = collection(myDb(), "posts");

const timeDiff = (date) => {
    const currentDate = Date.now();
    if (currentDate - date < 60000) {
        //Milliseconds in Min
        const seconds = parseInt((currentDate - date) / 1000);
        return `${seconds} seconds ago`;
    } else if (currentDate - date < 3600000) {
        //Milliseconds in Hr
        const minutes = parseInt((currentDate - date) / 60000);
        return `${minutes} minutes ago`;
    } else if (currentDate - date < 86400000) {
        //Milliseconds in Day
        const hours = parseInt((currentDate - date) / 3600000);
        return `${hours} hours ago`;
    } else {
        const publishDate = new Date(date);
        return `${publishDate.toLocaleString("en-US", {
            month: "short",
        })} ${publishDate.getDate()}, ${publishDate.getFullYear()}`;
    }
}

const fetchLiked = async () => {
    if (user) {
        const q = await getDoc(new doc(myDb(), "users", user.uid));
        if (q.data().liked_posts.map((x) => x.id).includes(props.id)) {
            liked.value = true;
        }
    }
}

const like = () => {
    if (user) {
        liked.value = !liked.value;
        if (liked.value) {
            likes.value += 1;
            updateDoc(doc(myDb(), "users", user.uid), {
                liked_posts: arrayUnion(doc(myDb(), "posts", props.id))
            })
        } else {
            likes.value -= 1;
            updateDoc(doc(myDb(), "users", user.uid), {
                liked_posts: arrayRemove(doc(myDb(), "posts", props.id))
            })
        }
        updateDoc(doc(postsRef, props.id), {
            likes: likes.value,
        })
    } else {
        alert("log in!");
    }
};

onMounted(async () => {
    const q = await getDoc(props.game);
    if (q.exists()) {
        game.value = q.data();
    }
    fetchLiked()
});
</script>

<style scoped>
span.active {
    animation: like 0.5s 1;
    color: red;
    stroke: none;
    stroke-width: 0;
}

@keyframes like {
    0% {
        transform: scale(1);
    }
    90% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1.1);
    }
}
</style>
