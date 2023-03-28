<template>
    <div class="flex h-screen bg-gray-800">
        <div class="m-auto flex flex-col text-white">
            <form
                @submit.prevent="login()"
                class="mt-16 flex flex-col gap-2"
                v-if="false">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    class="bg-charcoal-600 rounded p-2" />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="bg-charcoal-600 rounded p-2" />
                <button
                    type="submit"
                    class="rounded bg-green-500 p-2 font-medium hover:bg-green-400">
                    <span v-if="isSignUp"> Sign up </span>
                    <span v-else> Log in </span>
                </button>
                <button
                    @click="isSignUp = !isSignUp"
                    class="mt-8 w-full text-center text-sm text-slate-300 underline">
                    <span v-if="isSignUp">
                        Have an account? Log in instead
                    </span>
                    <span v-else> Create a new account </span>
                </button>
            </form>

            <h1 class="text-3xl">Welcome To Racketeer</h1>
            
            <button class="rounded-lg bg-blue-500 text-white" @click="useGoogleSignIn">
                <a> Sign In With Google </a>
            </button>
        </div>
    </div>
</template>

<script setup>
import { GoogleAuthProvider, getAdditionalUserInfo } from "@firebase/auth";

definePageMeta({
    layout: "none",
});

const isSignUp = ref(false);
const email = ref("");
const password = ref("");
const auth = myAuth();

const login = () => {
    if (!isSignUp.value) {
        usePasswordSignIn();
    } else {
        usePasswordCreateAccount();
    }
};
const getCurrentUser = () => {
    console.log(auth.currentUser);
};

const useGoogleSignIn = () => {
    return signInWithPopup(auth, getProvider())
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            createUserObjectIfNotExists(result);
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorCode, " => ", errorMessage);
            // ...
        });
};
const usePasswordSignIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

const usePasswordCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
};

const createUserObjectIfNotExists = async (result) => {
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
        await setDoc(doc(myDb(), "users", result.user.uid), {
            username: result.user.displayName,
            email: result.user.email,
            liked_posts: [],
            about: "I'm a new user!",
            profile_picture:
                "https://brightspotcdn.byu.edu/dims4/default/e74744e/2147483647/strip/true/crop/340x340+0+0/resize/200x200!/quality/90/?url=https%3A%2F%2Fbrigham-young-brightspot.s3.amazonaws.com%2Fbd%2F7f%2Face2612141aa8c6ad180b0786739%2Fdefault-pfp.jpg",
        });
        navigateTo(`/posts/users/${result.user.uid}`);
    } else {
        navigateTo("/");
    }
};
</script>

<style scoped></style>
