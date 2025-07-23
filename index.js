
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const productList = document.getElementById("product-list");

async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.imageUrl}" alt="${data.name}" width="200"/>
      <p>Price: R${data.price}</p>
    `;
    productList.appendChild(productDiv);
  });
}

fetchProducts();
