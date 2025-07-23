
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

document.getElementById("upload-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").files[0];
  const status = document.getElementById("status");

  try {
    const storageRef = ref(storage, "product-images/" + image.name);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "products"), {
      name,
      price,
      imageUrl: downloadURL
    });

    status.textContent = "Product uploaded successfully!";
  } catch (err) {
    console.error("Error uploading product:", err);
    status.textContent = "Error uploading product.";
  }
});
