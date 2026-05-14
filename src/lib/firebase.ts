// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXvBNQewgppqk48DBnLsLgSIQ8oZdqVng",
  authDomain: "gurupadukam-ed865.firebaseapp.com",
  projectId: "gurupadukam-ed865",
  storageBucket: "gurupadukam-ed865.firebasestorage.app",
  messagingSenderId: "702523430674",
  appId: "1:702523430674:web:417b86b759f5cdadb6c5cb",
  measurementId: "G-P6T4NFLXD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
