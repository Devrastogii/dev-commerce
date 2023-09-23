import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD_PMsX2KYLWUmsP3fdxKbFF8Id7BlM9LM",
  authDomain: "dev-ecommerce-11aab.firebaseapp.com",
  projectId: "dev-ecommerce-11aab",
  storageBucket: "dev-ecommerce-11aab.appspot.com",
  messagingSenderId: "442984743959",
  appId: "1:442984743959:web:b7ef854fc4ed45eded0852",
  measurementId: "G-H4HBDE4V00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)