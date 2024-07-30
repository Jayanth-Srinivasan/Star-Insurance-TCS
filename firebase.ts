import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKaNOukx5f4-e5BuBMgyJ1elP8Dt1Fqr0",
  authDomain: "star-protect.firebaseapp.com",
  projectId: "star-protect",
  storageBucket: "star-protect.appspot.com",
  messagingSenderId: "864298562554",
  appId: "1:864298562554:web:5f5c16d03861035ac6aa43",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
