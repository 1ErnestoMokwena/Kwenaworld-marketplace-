
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const storage = getStorage(app);
const db = getFirestore(app);

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageFile = document.getElementById("productImage").files[0];
  const status = document.getElementById("status");

  if (!imageFile) return status.innerText = "Please select an image";

  try {
    status.innerText = "Uploading image...";
    const imageRef = ref(storage, "products/" + imageFile.name);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    status.innerText = "Saving product data...";
    await addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      imageUrl,
      createdAt: new Date()
    });

    status.innerText = "Product uploaded successfully!";
  } catch (err) {
    console.error(err);
    status.innerText = "Error uploading product.";
  }
});
