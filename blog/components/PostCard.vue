<template>
    <div
        class="rounded-lg border border-gray-300 shadow-sm bg-slate-200 px-3 py-3 my-3 flex">
        <div class="m-auto">
            <button @click="liked = !liked">
                <span
                    class="material-symbols-outlined"
                    :class="liked ? 'active' : ''">
                    favorite
                </span>
            </button>
            <p>699</p>
        </div>
        <div class="m-auto pl-2 ml-2 border-solid border-l-slate-300 border-2">
            <h2 class="font-bold text-2xl tracking-wide px-2">Title</h2>
            <div class="flex gap-3" id="content">
                <p
                    class="font-thin text-sm text-slate-500 px-2 line-clamp-2 max-h-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in repreh
                </p>
                <img
                    src="https://static-cdn.jtvnw.net/ttv-boxart/511554_IGDB-272x380.jpg"
                    alt="balls"
                    class="h-16 w-16" />
            </div>
            <div
                class="flex justify-between tracking-tight"
                id="data">
                <div class="flex gap-1 text-xs text-slate-600 ">
                    <div class="flex">
                        <p class="my-auto mr-1">39 Comments</p>
                        <span class="font-extrabold text-lg">·</span>
                    </div>
                    <div class="my-auto">
                        <p>Posted 1 Minute Ago</p>
                    </div>
                </div>
                <div class="flex-none px-2 mr-16 my-auto rounded-md border-solid border border-slate-400">
                    <p class="text-sm text-slate-700">Arknights</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const liked = ref(false);
const user = myAuth().currentUser;

const fetchLiked = async () => {
    if (user) {
        console.log("hi");
    }
};
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
