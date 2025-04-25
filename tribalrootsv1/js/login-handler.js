// login-handler.js
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email + "@tribalroots.app", password);
    const userId = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      throw new Error("Rôle introuvable");
    }

    const userData = userDoc.data();
    const role = userData.role;

    sessionStorage.setItem("user", email);
    sessionStorage.setItem("role", role);

    if (role === "admin") {
      window.location.href = "index.html";
    } else if (role === "simpleUser") {
      window.location.href = "add-tickets.html";
    } else if (role === "viewer") {
      window.location.href = "approved.html";
    }
    else {
      throw new Error("Rôle non reconnu");
    }
  } catch (err) {
    console.error(err);
    document.getElementById("loginError").classList.remove("hidden");
  }
});
