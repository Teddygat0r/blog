<template>
    <FileUploadModal
        @closeModal="fileUpload = false"
        @submitUpload="setPFP"
        class="transition ease-in-out"
        :class="fileUpload ? 'visible opacity-100' : 'invisible opacity-0'" />
    <div
        class="my-3 flex w-full flex-col rounded-lg border border-gray-300 bg-slate-200 px-3 py-3 shadow-sm">
        <div class="relative m-auto">
            <div
                v-if="isCurrentUser && !props.disableUpload"
                class="absolute h-full w-full">
                <i
                    class="ri-add-circle-line p-[2px] text-center text-6xl opacity-0 transition delay-75 ease-in-out hover:cursor-pointer hover:opacity-50"
                    @click="fileUpload = true"></i>
            </div>
            <NuxtLink
                v-else
                class="absolute rounded-full opacity-0 transition delay-75 ease-in-out hover:opacity-20"
                :href="`/posts/users/${id}`">
                <div class="h-16 w-16 rounded-full bg-black"></div>
            </NuxtLink>
            <img
                :src="profile_picture"
                alt="Profile Picture"
                class="m-auto h-16 w-16 rounded-full" />
        </div>

        <h2 class="m-auto mb-2 text-center text-2xl font-bold tracking-wide">
            About <NuxtLink v-if="props.disableUpload" :href="`/posts/users/${ id }`">{{ username }}</NuxtLink>
            <span v-else>Me</span>
        </h2>
        <div @click="editAboutContent = true" v-if="isCurrentUser && !props.disableUpload">
            <textarea
                type="text"
                class="overflow-y-visible border border-black border-opacity-0 text-center text-sm hover:border-opacity-100"
                v-if="editAboutContent"
                v-model="aboutContent" />
            <p
                class="border border-black border-opacity-0 text-center text-sm hover:border-opacity-100"
                v-else>
                {{ aboutContent }}
            </p>
        </div>
        <p class="text-center text-sm" v-else>{{ about }}</p>
        <div v-if="editAboutContent">
            <button @click="saveEditedContent">Save</button>
        </div>
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
const emit = defineEmits(["updateProfile"]);

const aboutContent = ref(props.about);
const editAboutContent = ref(false);
const fileUpload = ref(false);

const isCurrentUser =
    myAuth().currentUser && myAuth().currentUser.uid == props.id;

const setPFP = (imageData) => {
    updateDoc(doc(myDb(), "users", props.id), {
        profile_picture: imageData,
    });

    emit("updateProfile");
};

const saveEditedContent = () => {
    updateDoc(doc(myDb(), "users", props.id), {
        about: aboutContent.value,
    });
    editAboutContent.value = false;

};

onMounted(() => {});
</script>

<style scoped></style>
