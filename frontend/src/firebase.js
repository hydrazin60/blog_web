// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log();
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-web-9b345.firebaseapp.com",
  projectId: "blog-web-9b345",
  storageBucket: "blog-web-9b345.appspot.com",
  messagingSenderId: "27693681328",
  appId: "1:27693681328:web:1805c4929f3e47ac814975"
};

 

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 

 