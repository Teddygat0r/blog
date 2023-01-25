<template>
    <div>Signed Out</div>
</template>

<script setup>
const auth = myAuth()
const useSignOutUser = async () => {
    const result = await auth.signOut()
    return result
}
onMounted(() => {
    useSignOutUser()
    window.location.href = "/"
})
</script>

<style lang="scss" scoped></style>
