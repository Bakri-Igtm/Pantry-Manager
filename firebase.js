// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlPR94CxyiUHzTAgj9uXSYqF7K21cjYhI",
  authDomain: "hspantryapp-b9f21.firebaseapp.com",
  projectId: "hspantryapp-b9f21",
  storageBucket: "hspantryapp-b9f21.appspot.com",
  messagingSenderId: "831131553912",
  appId: "1:831131553912:web:6797a2036b198e3ba25d8d",
  measurementId: "G-DV8914GVZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
export {
    app,
    firestore
}