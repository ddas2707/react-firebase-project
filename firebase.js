// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEdyz84TzWMtTkfg_ju4rKexNAQUhEFwk",
  authDomain: "fir-project-3865a.firebaseapp.com",
  projectId: "fir-project-3865a",
  storageBucket: "fir-project-3865a.appspot.com",
  messagingSenderId: "491836502309",
  appId: "1:491836502309:web:8688f36d48f7637f396acc",
  measurementId: "G-2P21MYCJF7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
