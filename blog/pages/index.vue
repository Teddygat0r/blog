<template>
    <div>
        <h1>hi</h1>
        <h1 @click="printAuth">Auth</h1>
    </div>
</template>

<script setup>
    
const printAuth = () => {
    const auth = getAuth()
    
}
</script>

<style scoped>

</style>