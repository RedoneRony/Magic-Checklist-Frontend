// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCjn_jSaBuuvFxE6OpZ-elNyJc_TgRbYww",

  authDomain: "simple-firebase-auth-32.firebaseapp.com",

  projectId: "simple-firebase-auth-32",

  storageBucket: "simple-firebase-auth-32.appspot.com",

  messagingSenderId: "967398305494",

  appId: "1:967398305494:web:e047478a62bc3178456377",

  measurementId: "G-B4XYW6DQQ6"

};


const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
