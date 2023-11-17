// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQaxpMIfF0jymQXPcumOrnTlzSHw3yU8w",
  authDomain: "the-hub-97b71.firebaseapp.com",
  projectId: "the-hub-97b71",
  storageBucket: "the-hub-97b71.appspot.com",
  messagingSenderId: "345338276403",
  appId: "1:345338276403:web:f45d5aa257e09479e85146",
  measurementId: "G-F6DP54PS4R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
