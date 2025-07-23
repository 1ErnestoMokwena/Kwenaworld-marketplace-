// upload.js

// Your Firebase config (replace if needed)
const firebaseConfig = {
  apiKey: "AIzaSyBnN7kl9SI00cWNvu5tGHxOJJcODcyc4a4",
  authDomain: "kwenaworld-marketplace.firebaseapp.com",
  projectId: "kwenaworld-marketplace",
  storageBucket: "kwenaworld-marketplace.appspot.com",
  messagingSenderId: "906613354644",
  appId: "1:906613354644:web:039527718d1a4788ac4481",
  measurementId: "G-PHQ57NC75Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Handle form submission
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const file = document.getElementById("image").files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = storage.ref().child(`product-images/${fileName}`);

  try {
    // Upload image to Firebase Storage
    const snapshot = await storageRef.put(file);
    const imageUrl = await snapshot.ref.getDownloadURL();

    // Save product info to Firestore
    await db.collection("products").add({
      name,
      price,
      description,
      category,
      image: imageUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("✅ Product uploaded successfully!");
    document.getElementById("productForm").reset();
  } catch (error) {
    console.error("Error uploading product:", error);
    alert("❌ Failed to upload product. See console for details.");
  }
});
