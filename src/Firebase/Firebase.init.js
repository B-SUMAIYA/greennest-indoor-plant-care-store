// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtghThxuDOsf5ZMAvMZeujvPDm3oxcGz4",
  authDomain: "greennest-indoor-plant.firebaseapp.com",
  projectId: "greennest-indoor-plant",
  storageBucket: "greennest-indoor-plant.firebasestorage.app",
  messagingSenderId: "350900328107",
  appId: "1:350900328107:web:abdf862d802913bab149ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
