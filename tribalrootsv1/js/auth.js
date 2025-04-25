// auth.js

import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

export async function getUserRef() {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return data.ref || null;
}







export function checkAuthAndAccess() {
  const role = sessionStorage.getItem("role");
  const user = sessionStorage.getItem("user");
  const page = window.location.pathname;

  if (!user || !role) {
    window.location.href = "login.html";
  }

  const restrictedPages = {
    "/index.html": ["admin", "simpleUser"],
    "/dashboard.html": ["admin", "viewer"],
    "/tickets.html": ["admin", "viewer"],
    "/add-tickets.html": ["admin", "simpleUser"],
    "/approved.html": ["admin", "simpleUser", "viewer"]
  };

  const allowedRoles = restrictedPages[page];

  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Accès refusé : vous n'avez pas l'autorisation d'afficher cette page.");
    window.location.href = "login.html";
  }
}

export function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

export function getUserInfo() {
  return {
    user: sessionStorage.getItem("user"),
    role: sessionStorage.getItem("role")
  };
}

