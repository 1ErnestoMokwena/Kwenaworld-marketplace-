import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';

const productsCountEl = document.getElementById('products-count');
const ordersCountEl = document.getElementById('orders-count');
const subscriptionStatusEl = document.getElementById('subscription-status');

async function loadDashboardStats() {
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    const ordersSnap = await getDocs(collection(db, 'orders'));
    productsCountEl.textContent = `Products: ${productsSnap.size}`;
    ordersCountEl.textContent = `Orders: ${ordersSnap.size}`;
    subscriptionStatusEl.textContent = `Subscription: Active`;
  } catch (err) {
    productsCountEl.textContent = 'Products: Error';
    ordersCountEl.textContent = 'Orders: Error';
    subscriptionStatusEl.textContent = 'Subscription: Error';
    console.error(err);
  }
}

loadDashboardStats();
