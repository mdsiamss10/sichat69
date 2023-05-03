// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJHWDgs6_dJsgC3DGiMaIyVI_x_6E-osw",
  authDomain: "next13chat.firebaseapp.com",
  databaseURL: "https://next13chat-default-rtdb.firebaseio.com",
  projectId: "next13chat",
  storageBucket: "next13chat.appspot.com",
  messagingSenderId: "443830232029",
  appId: "1:443830232029:web:51a0538170321b59f98c34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
