
document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const list = document.getElementById("product-list");

  db.collection("products")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        status.textContent = "No products found.";
        return;
      }
      status.style.display = "none";
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}" width="100%" />
          <p>Price: ${product.price}</p>
          <p>${product.description}</p>
        `;
        list.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error loading products: ", error);
      status.textContent = "Failed to load products.";
    });
});
