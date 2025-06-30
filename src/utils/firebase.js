// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArLhGLcbhH9-oP1solNjNaTycXt7-ciXY",
  authDomain: "pomodoroapp-114fe.firebaseapp.com",
  projectId: "pomodoroapp-114fe",
  storageBucket: "pomodoroapp-114fe.firebasestorage.app",
  messagingSenderId: "656611712062",
  appId: "1:656611712062:web:da35b5c6a7f49e1ec1456f",
  measurementId: "G-TYEJ73RB1Q"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);           // <-- You were missing this!
const analytics = getAnalytics(app);

// ✅ Export properly
export { auth, analytics };
