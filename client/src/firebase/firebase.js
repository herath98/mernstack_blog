// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marnblog.firebaseapp.com",
  projectId: "marnblog",
  storageBucket: "marnblog.appspot.com",
  messagingSenderId: "475618260577",
  appId: "1:475618260577:web:8d2761b0204ec9cf05dc20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 