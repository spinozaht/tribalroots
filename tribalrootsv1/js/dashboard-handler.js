// dashboard-handler.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  collection,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("addUserForm");
const userAddStatus = document.getElementById("userAddStatus");

// 🔍 Filtrage utilisateur
searchInput.addEventListener("input", renderUsers);

// Charger et afficher les utilisateurs
async function renderUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  const query = searchInput.value.toLowerCase();
  userList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (
      data.email.toLowerCase().includes(query) ||
      data.role.toLowerCase().includes(query) ||
      (data.ref && data.ref.toLowerCase().includes(query))
    ) {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded shadow flex justify-between items-center";
      div.innerHTML = `
        <div>
          <p><strong>${data.email}</strong> (${data.role})</p>
          <p class="text-sm text-gray-500">Réf: ${data.ref || "-"}</p>
        </div>
        <span class="text-xs text-gray-400">ID: ${docSnap.id.slice(0, 6)}...</span>
      `;
      userList.appendChild(div);
    }
  });
}

// ➕ Ajouter un nouvel utilisateur
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  try {
    const emailFull = `${email}@tribalroots.app`;
    const userCred = await createUserWithEmailAndPassword(auth, emailFull, password);
    const userId = userCred.user.uid;

    await setDoc(doc(db, "users", userId), {
      email: email,
      role: role,
      ref: email.charAt(0).toUpperCase() + email.slice(1)
    });

    userAddStatus.classList.remove("hidden");
    setTimeout(() => userAddStatus.classList.add("hidden"), 3000);
    form.reset();
    renderUsers();
  } catch (err) {
    alert("Erreur lors de la création : " + err.message);
    console.error(err);
  }
});

// Auto-render users
renderUsers();
