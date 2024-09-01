// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ8EHCQa_RLic6R5QfwzH030QOixpBv7Y",
  authDomain: "expense-tracker-fdaeb.firebaseapp.com",
  projectId: "expense-tracker-fdaeb",
  storageBucket: "expense-tracker-fdaeb.appspot.com",
  messagingSenderId: "892943686505",
  appId: "1:892943686505:web:d53564cd8acaaa9b777bf8",
  measurementId: "G-M2VRZ5SQDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)