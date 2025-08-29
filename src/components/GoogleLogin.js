import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";

function GoogleLogin() {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setMessage("✅ You have already logged in.");
      } else {
        setIsLoggedIn(false);
        setMessage("");
      }
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "N/A",
        email: user.email,
        uid: user.uid,
        timestamp: new Date()
      });

      setMessage("✅ You are successfully logged in.");
    } catch (error) {
      console.error("❌ Google login failed:", error);
      setMessage("❌ Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("👋 You have been logged out.");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

export default GoogleLogin;