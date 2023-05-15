// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRuJFwnhnLxJRqHFk4wPyZd6KUplp1QaY",
  authDomain: "sichat69.firebaseapp.com",
  projectId: "sichat69",
  storageBucket: "sichat69.appspot.com",
  messagingSenderId: "284150239936",
  appId: "1:284150239936:web:7827bc9ce99e9c44121325",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
