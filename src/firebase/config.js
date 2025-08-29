import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Add auth tools

const firebaseConfig = {
  apiKey: "AIzaSyDS9knsBdjbrEl41rQTJ5wIEcOf3D-QdNw",
  authDomain: "homeocare-navigator.firebaseapp.com",
  projectId: "homeocare-navigator",
  storageBucket: "homeocare-navigator.firebasestorage.app",
  messagingSenderId: "1007972745863",
  appId: "1:1007972745863:web:9262a78f5025c9d1f42e22",
  measurementId: "G-LRJSJJ3YJX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Firestore
const analytics = getAnalytics(app); // ✅ Analytics
const auth = getAuth(app); // ✅ Authentication
const provider = new GoogleAuthProvider(); // ✅ Google login provider

console.log("Analytics initialized:", analytics);

export { db, auth, provider }; // ✅ Export all needed modules