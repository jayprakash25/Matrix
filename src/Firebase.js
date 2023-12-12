import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQaxpMIfF0jymQXPcumOrnTlzSHw3yU8w",
  authDomain: "the-hub-97b71.firebaseapp.com",
  projectId: "the-hub-97b71",
  storageBucket: "the-hub-97b71.appspot.com",
  messagingSenderId: "345338276403",
  appId: "1:345338276403:web:f45d5aa257e09479e85146",
  measurementId: "G-F6DP54PS4R",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db ,storage};
