import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
export const app = initializeApp(firebaseConfig)
const firestore =  getFirestore(app)
export const getDB = () => { return firestore }
