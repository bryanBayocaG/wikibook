import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVrscJYZgasETxkXasrUIrY1MYamEjYYk",
  authDomain: "wikipok-293c9.firebaseapp.com",
  projectId: "wikipok-293c9",
  storageBucket: "wikipok-293c9.firebasestorage.app",
  messagingSenderId: "343335634163",
  appId: "1:343335634163:web:73c73e650a6a4478f46386",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get the firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
