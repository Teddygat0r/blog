<template>
    <div>
        Signed Out
    </div>
</template>

<script setup>
    onMounted(() => {
        useSignOutUser()
        window.location.href="/"
    })
</script>

<style lang="scss" scoped>

</style>