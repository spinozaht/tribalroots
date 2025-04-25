// js/tickets.js
import { db } from './firebase.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

export async function saveTicket(ticket) {
  try {
    await addDoc(collection(db, "tickets"), ticket);
    console.log("✅ Ticket ajouté dans Firestore");
  } catch (e) {
    console.error("❌ Erreur ajout ticket :", e.message);
  }
}

export async function getTickets() {
  const snapshot = await getDocs(collection(db, "tickets"));
  return snapshot.docs.map(doc => doc.data());
}

export async function generateClientId() {
  const tickets = await getTickets();
  const nextId = tickets.length + 1;
  return `TR-${nextId.toString().padStart(3, '0')}`;
}
