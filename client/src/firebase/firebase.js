// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "star-blog-3d0dd.firebaseapp.com",
  projectId: "star-blog-3d0dd",
  storageBucket: "star-blog-3d0dd.appspot.com",
  messagingSenderId: "106955797885",
  appId: "1:106955797885:web:15f294ef5cb864b162c814"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 