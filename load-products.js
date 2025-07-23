
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const productsContainer = document.getElementById('products-container');
productsContainer.innerHTML = '';

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.empty) {
      productsContainer.innerHTML = "<p>No products found.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.name}" />
        <h3>${data.name}</h3>
        <p>R ${data.price}</p>
      `;
      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    productsContainer.innerHTML = "<p>Error loading products.</p>";
  }
}

loadProducts();
