// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDryPL9w_pFtJxznSO5iXK_L_qVeeOWVXo",
  authDomain: "motivalab-24bab.firebaseapp.com",
  projectId: "motivalab-24bab",
  storageBucket: "motivalab-24bab.firebasestorage.app",
  messagingSenderId: "970617902655",
  appId: "1:970617902655:web:cae49f5d23b7a727180a8a",
  measurementId: "G-4L6XTE0071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);