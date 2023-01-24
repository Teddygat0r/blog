<template>
    <div class="flex mx-5 gap-10">
        <div class="flex-grow min-w-[450px] max-w-[700px]" id="posts">
            <div>
                <PostCard postId = "deeZnuTs"/>
            </div>
        </div>
        <div class="flex-shrink min-w-[320px] m-auto hidden md:block h-20" id="sidebar">
            <Advertisement />
        </div>
    </div>
</template>

<script setup>
    
const printAuth = () => {
    console.log(auth)
}
</script>

<style scoped>

</style>