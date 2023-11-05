// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt7N38OqcFsYBoBgk7sToGmXgf4qkiybY",
  authDomain: "demopro-6e9fe.firebaseapp.com",
  projectId: "demopro-6e9fe",
  storageBucket: "demopro-6e9fe.appspot.com",
  messagingSenderId: "957566964529",
  appId: "1:957566964529:web:b9d054a1e6ccc4d35d1610"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
