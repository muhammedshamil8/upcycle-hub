import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAI_MMWlvx19Uf7743-9dLaPRI1L34ivJQ",
  authDomain: "upcycle-hub.firebaseapp.com",
  projectId: "upcycle-hub",
  storageBucket: "upcycle-hub.firebasestorage.app",
  messagingSenderId: "534078633664",
  appId: "1:534078633664:web:bf896027281616af2b5f25",
  measurementId: "G-8YNFDWE3MR"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

