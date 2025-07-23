// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnN7kl9SI00cWNvu5tGHxOJJcODcyc4a4",
  authDomain: "kwenaworld-marketplace.firebaseapp.com",
  projectId: "kwenaworld-marketplace",
  storageBucket: "kwenaworld-marketplace.appspot.com",
  messagingSenderId: "906613354644",
  appId: "1:906613354644:web:039527718d1a4788ac4481",
  measurementId: "G-PHQ57NC75Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
