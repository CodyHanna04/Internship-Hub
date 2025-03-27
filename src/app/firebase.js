// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN1KwM0PaJ4Y6Jfd7xVj0UYBRDStlRJjg",
  authDomain: "internship-hub-su.firebaseapp.com",
  projectId: "internship-hub-su",
  storageBucket: "internship-hub-su.firebasestorage.app",
  messagingSenderId: "627408584967",
  appId: "1:627408584967:web:84e0f299f6fc0a8426c5a2",
  measurementId: "G-BN4ES5RC9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);