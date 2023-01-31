import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, collection, query, where, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdLRaPS5h3znOBbuRfeABeF1m8x3rCtE0",
    authDomain: "blog-cf192.firebaseapp.com",
    projectId: "blog-cf192",
    storageBucket: "blog-cf192.appspot.com",
    messagingSenderId: "919145441434",
    appId: "1:919145441434:web:f004302ab2ca935454d723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const myAuth = () => { return auth }
const db = getFirestore(app)
const myDb = () => { return db }
const provider = new GoogleAuthProvider()
const getProvider = () => { return provider }

export { app, getProvider, myAuth, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword};

export { myDb, collection, query, where, doc, setDoc, getDoc, getDocs, updateDoc }