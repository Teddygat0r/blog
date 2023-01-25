<template>
    <div class="flex bg-slate-600 py-8 text-slate-100 justify-between">
        <h1 class="ml-8 text-3xl"><NuxtLink to="/">Racketeer</NuxtLink></h1>
        <ul class="flex space-x-4 mr-8 text-lg" v-if="loaded">
            <li><a href="#">About</a></li>
            <li>
                <span v-if="authUser">
                    <a href="#">Posts</a>
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
            <h1 @click="">Check Auth</h1>
        </ul>
    </div>
</template>

<script setup>
    const auth = myAuth()
    const authUser = ref(null)
    const loaded = ref(false)

    onAuthStateChanged(auth, (user) => {
        loaded.value = true
        if(user){
            authUser.value = true
        }
    })

</script>

<style scoped>

</style>