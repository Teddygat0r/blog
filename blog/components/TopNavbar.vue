<template>
    <div class="flex bg-slate-600 py-12 text-slate-100 justify-between">
        <h1 class="ml-8 text-3xl">Racketeer</h1>
        <ul class="flex space-x-4 mr-8 text-lg">
            <li><a href="#">About</a></li>
            <li>
                <span v-if="isLoggedIn()">
                    <a href="#">Sign Up</a>
                </span>
                <span v-else>
                    <a href="#">Posts</a>
                </span>
            </li>
            <li>
                <span v-if="isLoggedIn()">
                    <a href="#">Log In</a>
                </span>
                <span v-else>
                    <a href="#">Me</a>
                </span>
                
            </li>
            <h1 @click="isLoggedIn()">Check Auth</h1>
        </ul>
    </div>
</template>

<script setup>
    const auth = getAuth()
    const isLoggedIn = () => {
        console.log(auth.currentUser)
        return (auth.currentUser == null)
    }
</script>

<style scoped>

</style>