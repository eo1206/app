import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDryPL9w_pFtJxznSO5iXK_L_qVeeOWVXo",
  authDomain: "motivalab-24bab.firebaseapp.com",
  projectId: "motivalab-24bab",
  storageBucket: "motivalab-24bab.firebasestorage.app",
  messagingSenderId: "970617902655",
  appId: "1:970617902655:web:cae49f5d23b7a727180a8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase conectado");

export { db };