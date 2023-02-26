<template>
    <FileUploadModal @closeModal="fileUpload = false" @submitUpload="setPFP" class="transition ease-in-out" :class="fileUpload ? 'visible opacity-100':'opacity-0 invisible'"/>
    <div
        class="my-3 flex w-full flex-col rounded-lg border border-gray-300 bg-slate-200 px-3 py-3 shadow-sm">
        <div class="relative m-auto">
            <div v-if="isCurrentUser && !props.disableUpload" class="absolute w-full h-full">
                <i class="ri-add-circle-line text-6xl opacity-0 hover:opacity-50 hover:cursor-pointer text-center p-[2px] transition ease-in-out delay-75" @click="fileUpload = true"></i>
            </div>
            <NuxtLink v-else class="absolute rounded-full opacity-0 hover:opacity-20 transition ease-in-out delay-75" :href="`/posts/users/${ id }`">
                <div class="w-16 h-16 bg-black rounded-full"></div>
            </NuxtLink>
            <img
                :src="profile_picture"
                alt="Profile Picture"
                class="m-auto h-16 w-16 rounded-full" />
        </div>

        <h2 class="m-auto mb-2 text-2xl font-bold tracking-wide text-center">
            About <span v-if="props.disableUpload">{{ username }}</span> <span v-else>Me</span>
        </h2>
        <p class="text-center text-sm">{{ about }}</p>
    </div>
    
</template>

<script setup>
const props = defineProps({
    username: String,
    about: String,
    profile_picture: String,
    id: String,
    disableUpload: Boolean,
});
const emit = defineEmits(['updateProfile'])

const fileUpload = ref(false)

const isCurrentUser = myAuth().currentUser && myAuth().currentUser.uid == props.id;

const setPFP = (imageData) => {
    updateDoc(doc(myDb(), "users", props.id), {
        profile_picture: imageData,
    })

    emit('updateProfile')
}

onMounted(() => {

});
</script>

<style scoped></style>
