// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_WXVThAt6dZo76VtcOn2IPaE8_G0SVDQ",
  authDomain: "vite-contact-cb373.firebaseapp.com",
  projectId: "vite-contact-cb373",
  storageBucket: "vite-contact-cb373.appspot.com",
  messagingSenderId: "288427361507",
  appId: "1:288427361507:web:3cf872bec90a8dfc22b1d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) ;