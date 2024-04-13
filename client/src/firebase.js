// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hafsa-blog.firebaseapp.com",
  projectId: "hafsa-blog",
  storageBucket: "hafsa-blog.appspot.com",
  messagingSenderId: "1037082433982",
  appId: "1:1037082433982:web:f7b812b6ba1f74615301ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);