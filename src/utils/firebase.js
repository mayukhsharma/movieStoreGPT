// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyPHVqfEic8NkVz_c8LY-4I60KtrOHKsE",
  authDomain: "booknook-bbf58.firebaseapp.com",
  projectId: "booknook-bbf58",
  storageBucket: "booknook-bbf58.appspot.com",
  messagingSenderId: "1078484598887",
  appId: "1:1078484598887:web:c1d937311dc84a801594c2",
  measurementId: "G-X4F88HTT8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();