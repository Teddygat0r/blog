<template>
    <div class="flex justify-between bg-slate-600 py-4 text-slate-100">
        <h1 class="ml-8 text-3xl"><NuxtLink to="/">Racketeer</NuxtLink></h1>
        <ul class="mr-8 flex space-x-4 text-lg" v-if="loaded">
            <li><a href="#">About</a></li>
            <li>
                <span v-if="myAuth().currentUser">
                    <NuxtLink :href="`/posts/users/${myAuth().currentUser.uid}`"
                        >Posts</NuxtLink
                    >
                </span>
                <span v-else>
                    <NuxtLink to="/auth/signup">Sign Up</NuxtLink>
                </span>
            </li>
            <li>
                <span v-if="authUser">
                    <NuxtLink to="/auth/logout">Log Out</NuxtLink>
                </span>
                <span v-else>
                    <NuxtLink to="/auth/signup">Log In</NuxtLink>
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const auth = myAuth();
const authUser = ref(null);
const loaded = ref(false);

onAuthStateChanged(auth, (user) => {
    loaded.value = true;
    if (user) {
        authUser.value = true;
    } else {
        authUser.value = false;
    }
});
</script>

<style scoped></style>
