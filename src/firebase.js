// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1z1RsltlsFZ92o2Ux-jggtNS5rcKUU8w",
  authDomain: "lucky-car-renters.firebaseapp.com",
  projectId: "lucky-car-renters",
  storageBucket: "lucky-car-renters.firebasestorage.app",
  messagingSenderId: "382601386317",
  appId: "1:382601386317:web:ff955206954ffc69b27f04",
  measurementId: "G-PPM85566E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;