<template>
    <div class="flex bg-slate-600 py-12 text-slate-100 justify-between">
        <h1 class="ml-8 text-3xl">Racketeer</h1>
        <ul class="flex space-x-4 mr-8 text-lg" v-if="authLoaded">
            <li><a href="#">About</a></li>
            <li>
                <span v-if="checkUser()">
                    <a href="#">Posts</a>
                </span>
                <span v-else>
                    <a href="#">Sign Up</a>
                </span>
            </li>
            <li>
                <span v-if="checkUser()">
                    <a href="#">Me</a>
                </span>
                <span v-else>
                    <a href="#">Log In</a>
                </span>
                
            </li>
            <h1 @click="checkUser()">Check Auth</h1>
        </ul>
    </div>
</template>

<script setup>
    const auth = getAuth()

    const checkUser = () => {
        console.log(auth.currentUser)
        return auth.currentUser != null
    }

</script>

<style scoped>

</style>