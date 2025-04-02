// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI_MMWlvx19Uf7743-9dLaPRI1L34ivJQ",
  authDomain: "upcycle-hub.firebaseapp.com",
  projectId: "upcycle-hub",
  storageBucket: "upcycle-hub.firebasestorage.app",
  messagingSenderId: "534078633664",
  appId: "1:534078633664:web:bf896027281616af2b5f25",
  measurementId: "G-8YNFDWE3MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);