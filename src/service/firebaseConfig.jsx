// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUOPzHdueMVmOa6BJMUy8kP3IH8i_08fs",
  authDomain: "aitravelplanner-62b25.firebaseapp.com",
  projectId: "aitravelplanner-62b25",
  storageBucket: "aitravelplanner-62b25.firebasestorage.app",
  messagingSenderId: "416144031293",
  appId: "1:416144031293:web:b5e7df53b965c26e92f454",
  measurementId: "G-Q0NY4VHR2D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);