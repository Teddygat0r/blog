<template>
    <div class="flex h-screen">
        <div class="m-auto flex flex-col">
            <form @submit.prevent="login()" class="flex flex-col gap-2 mt-16">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    class="p-2 rounded bg-charcoal-600" />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="p-2 rounded bg-charcoal-600" />
                <button
                    type="submit"
                    class="p-2 font-medium bg-green-500 rounded hover:bg-green-400">
                    <span v-if="isSignUp"> Sign up </span>
                    <span v-else> Log in </span>
                </button>
            </form>
            <button
                @click="isSignUp = !isSignUp"
                class="w-full mt-8 text-sm text-center underline text-slate-300">
                <span v-if="isSignUp"> Have an account? Log in instead </span>
                <span v-else> Create a new account </span>
            </button>
            <button class="bg-blue-500 rounded-lg" @click="useGoogleSignIn">
                <a> Sign In With Google </a>
            </button>
            <button @click="getCurrentUser">hi</button>
            <button @click="useSignOutUser">Bye</button>
        </div>
    </div>
</template>

<script setup>
import { GoogleAuthProvider, getAdditionalUserInfo } from "@firebase/auth";

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

const useSignOutUser = async () => {
    const result = await auth.signOut();
    return result;
};

const createUserObjectIfNotExists = async (result) => {
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
        await setDoc(doc(myDb(), "users", result.user.uid), {
            username: result.user.displayName,
            email: result.user.email,
        });
    }
};
</script>

<style scoped></style>
