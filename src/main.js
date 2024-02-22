//main.js
import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh4v3fO_GAA2-66L_HC0m4P6BJgcRfuUQ",
  authDomain: "tdee-app-efd90.firebaseapp.com",
  projectId: "tdee-app-efd90",
  storageBucket: "tdee-app-efd90.appspot.com",
  messagingSenderId: "369462892934",
  appId: "1:369462892934:web:befd0b995cfad565b73407",
  measurementId: "G-LCH8KMXGZN"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
const db = getFirestore(initializeApp(firebaseConfig));


app.use(router)
app.mount('#app')

export default db
