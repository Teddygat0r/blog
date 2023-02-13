<template>
    <div class="flex w-full flex-col gap-2 overflow-x-clip" v-if="gameObject">
        <div class="relative flex h-full w-full overflow-y-hidden pt-24">
            <!-- Backdrop shadow blur-->
            <div class="absolute top-0 z-10 h-full w-full" id="banner"></div>
            <img
                :src="gameObject.banner_link"
                class="absolute top-0 z-0 w-full" />
            <h1
                class="text-shadow-lg z-10 mx-auto rounded-lg p-2 text-6xl font-semibold tracking-wide text-white">
                {{ gameObject.name }}
            </h1>
        </div>
        <div class="m-auto flex gap-10">
            <div class="min-w-[450px] max-w-[700px] flex-grow" id="posts">
                <div class="w-full">
                    <PostCard
                        v-for="post in postObjects"
                        v-bind="post"
                        :key="post.id">
                        <p>{{ post }}</p>
                    </PostCard>
                </div>
            </div>
            <div
                class="hidden h-20 w-[150px] flex-shrink md:block"
                id="sidebar">
                <GameSidebar v-if="gameObject" v-bind="gameObject" />
                <Advertisement />
            </div>
        </div>
    </div>
</template>

<script setup>
import { query, orderBy, limit } from "firebase/firestore";

const { gameName } = useRoute().params;
const gameObject = ref({});
const postObjects = ref({});

onMounted(async () => {
    const qgame = query(
        collection(myDb(), "games"),
        where("link", "==", `/games/${gameName.toLowerCase()}`)
    );
    const qgameSnapshot = await getDocs(qgame);

    if (qgameSnapshot.size == 0)
        throw createError({
            statusCode: 404,
            statusMessage: "Game not Found",
            fatal: true,
        });

    qgameSnapshot.forEach(async (doc) => {
        gameObject.value = gameConverter.fromFirestore(doc);
    });

    const fbGameRef = doc(collection(myDb(), "games"), gameObject.value.id);
    const qposts = query(
        collection(myDb(), "posts"),
        where("game", "==", fbGameRef),
        limit(5)
    );
    const qpostSnapshot = await getDocs(qposts);

    let fbPosts = [];
    qpostSnapshot.forEach(async (doc) => {
        const docData = postConverter.fromFirestore(doc);
        fbPosts.push(docData);
    });

    //Sorts posts by date
    fbPosts.sort((a, b) => {
        return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
    });

    postObjects.value = fbPosts;
});
</script>

<style scoped>
div {
    background-color: rgba(0, 255, 0, 0.1);
    outline-color: rgba(255, 0, 0, 0.5);
    outline-width: thin;
    outline-style: solid;
}

#banner {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9));
}

.text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
