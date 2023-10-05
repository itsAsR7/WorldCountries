// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3btPNHp0L0WAT2HdVVJcGyNcBUuyM278",
  authDomain: "worldcountries-e2dfb.firebaseapp.com",
  projectId: "worldcountries-e2dfb",
  storageBucket: "worldcountries-e2dfb.appspot.com",
  messagingSenderId: "91457918923",
  appId: "1:91457918923:web:817fd07d310b461baa484e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app)


export { db };