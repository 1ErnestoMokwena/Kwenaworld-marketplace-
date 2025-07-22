// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnN7kl9SI00cWNvu5tGHxOJJcODcyc4a4",
  authDomain: "kwenaworld-marketplace.firebaseapp.com",
  projectId: "kwenaworld-marketplace",
  storageBucket: "kwenaworld-marketplace.appspot.com",
  messagingSenderId: "906613354644",
  appId: "1:906613354644:web:e86e2ab24aec3a10ac4481",
  measurementId: "G-S8JF927Z52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and display products
async function loadProducts() {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "<p>Loading...</p>";

  const querySnapshot = await getDocs(collection(db, "products"));
  productGrid.innerHTML = ""; // Clear loading text

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>R${product.price}</strong></p>
      </div>
    `;
    productGrid.innerHTML += productCard;
  });
}

loadProducts();
