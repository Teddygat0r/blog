<template>
    <div class="justify-center w-[700px] m-auto">
        <div class="flex flex-col gap-2 mx-auto my-4">
            <input
                placeholder="Enter the Title"
                class="w-full p-2 text-2xl rounded-md"
                maxLength="120"
                v-model="postTitle" />
            <input
                placeholder="Your summary"
                class="w-full p-2 rounded-md"
                maxLength="240"
                v-model="postSummary" />

            <TipTapPostEditor v-model="postBody" />
        </div>
        <div class="w-full mx-auto mb-4">
            <input
                placeholder="Image url"
                class="w-full p-2 rounded-md"
                v-model="image_link" />
        </div>
        <div class="container flex justify-between w-full">
            <input
                class="px-2 py-2 my-auto rounded-md"
                v-model="game"
                id="autoComplete"
                type="search"
                dir="ltr"
                spellcheck="false"
                autocorrect="off"
                autocomplete="off"
                autocapitalize="off"
                placeholder="Enter your game" />

            <button
                class="px-5 py-2 text-white transition ease-in-out rounded-lg bg-cyan-600 hover:ring-2"
                @click="publishPost()">
                Publish!
            </button>
        </div>
    </div>
</template>

<script setup>
import { Timestamp, addDoc } from "@firebase/firestore";
import autoComplete from "@tarekraafat/autocomplete.js";
import sanitizeHtml from "sanitize-html";

const gamesList = ref([]);
const game = ref("");
const image_link = ref("");

const postTitle = ref("");
const postSummary = ref("");
const postBody = ref("");

const testFunction = async () => {
    setPostGame()
};

const fetchGames = async () => {
    const q = query(collection(myDb(), "games"));
    const querySnapshot = await getDocs(q);

    let lst = [];
    let names = [];
    querySnapshot.forEach(async (doc) => {
        lst.push(doc);
        names.push(doc.data().name);
    });
    gamesList.value = lst;
    return names;
};

const setPostGame = async () => {
    //Gets index of the game with your game name excluding case
    const index = gamesList.value
        .map((fbGame) => fbGame.data().name.toLowerCase())
        .indexOf(game.value.toLowerCase());

    //Creates new game if the set game doesn't exist
    if (index === -1) {
        const newGameRef = doc(collection(myDb(), "games"));

        await setDoc(newGameRef, {
            name: game.value,
            link: `/games/${ game.value.toLowerCase().replaceAll(" ", "_") }`,
        });

        return newGameRef;
    }

    return doc(collection(myDb(), "games"), gamesList.value[index].id);
};

const validation = async () => {
    let validated = true;

    let res = await fetch(image_link.value, { mode: "no-cors" });
    const buff = await res.blob();
    if (!buff.type.startsWith("image/")) {
        alert("Link doesn't lead to a valid URL!");
    }

    //Checks if game name is in the database.
    if (gamesList.value
        .map((fbGame) => fbGame.data().name.toLowerCase())
        .indexOf(game.value.toLowerCase()) == -1) {
        alert("Game is Incorrect/Nonexistent!");
        validated = false;
    }

    if (postTitle.value === "") {
        alert("Title is empty!");
        validated = false;
    }
    if (postSummary.value === "") {
        alert("Summary is empty!");
        validated = false;
    }
    console.log(postBody.value)
    console.log(sanitizeHtml(postBody.value))
    return validated;
};

const publishPost = async () => {
    if (await validation()) {
        await addDoc(collection(myDb(), "posts"), {
            author: doc(myDb(), "users", myAuth().currentUser.uid),
            comments: [],
            content: sanitizeHtml(postBody.value),
            date: Timestamp.fromMillis(Date.now()),
            game: await setPostGame(),
            image_link: image_link.value,
            likes: 0,
            summary: sanitizeHtml(postSummary.value),
            title: sanitizeHtml(postTitle.value),
        });

        navigateTo("/");
    }
};

onMounted(async () => {
    const auto = new autoComplete({
        placeHolder: "Search for Game",
        data: {
            src: await fetchGames(),
            cache: true,
        },
        resultItem: {
            highlight: true,
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    auto.input.value = selection;
                    game.value = selection;
                },
            },
        },
    });
    await fetchGames();
});
</script>

<style scoped></style>
