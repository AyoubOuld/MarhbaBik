import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVZ2n_eGSVx3ZUThZ9-pxGCIzL7K631M8",
  authDomain: "marhbabik-pfe.firebaseapp.com",
  projectId: "marhbabik-pfe",
  storageBucket: "marhbabik-pfe.appspot.com",
  messagingSenderId: "1079641719409",
  appId: "1:1079641719409:web:5e3fc57aad61a71ff111d0",
  measurementId: "G-XLR4V8W4TR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, googleProvider, db, storage} ;