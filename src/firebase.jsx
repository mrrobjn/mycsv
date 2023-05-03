import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqtiJQlB6Mzel-crclVNpUO48raOv932A",
  authDomain: "csv-database-bff90.firebaseapp.com",
  projectId: "csv-database-bff90",
  storageBucket: "csv-database-bff90.appspot.com",
  messagingSenderId: "367115935269",
  appId: "1:367115935269:web:21ea827cddf327c09a29cc",
  measurementId: "G-LLQ00V66Q9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
