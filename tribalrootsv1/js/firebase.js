// firebase.js

// Importation du SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwPTm42q4UcmxVj_bx2dq_ySK6ZXZp5lM",
  authDomain: "ticketstribalroots.firebaseapp.com",
  projectId: "ticketstribalroots",
  storageBucket: "ticketstribalroots.firebasestorage.app",
  messagingSenderId: "756732348962",
  appId: "1:756732348962:web:9c329c918dd1b5ef50587b",
  measurementId: "G-D0X26NMZLR"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exportation des services Firebase
export { db, auth };