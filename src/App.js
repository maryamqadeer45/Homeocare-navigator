import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import "./App.css";
import HomePage from "./components/HomePage";
import AboutSection from "./components/AboutSection";
import RemedyList from "./components/RemedyList";
import DiseaseList from "./components/DiseaseList";
import GoogleLogin from "./components/GoogleLogin";
import ContactSection from "./components/ContactSection";

function App() {
  const [language, setLanguage] = useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "English" ? "Urdu" : "English"
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <div className="App">
      {!showContent ? (
        <HomePage onExplore={() => setShowContent(true)} />
      ) : (
        <>
          {/* Top Bar */}
          <header className="top-bar">
            <h1>Homeocare Navigator</h1>
            <button onClick={toggleLanguage}>
              Switch to {language === "English" ? "Urdu" : "English"}
            </button>
          </header>

          {/* About Section */}
          <AboutSection />

          {/* Remedy Highlights */}
          <section id="remedies">
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>
              Remedy Highlights ({language})
            </h2>
            <RemedyList language={language} />
          </section>

          {/* Disease Overview */}
          <section id="diseases">
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>
              Disease Overview ({language})
            </h2>
            <DiseaseList language={language} />
          </section>

          {/* Contact Section */}
          <ContactSection />

          {/* Optional Login */}
          {!isLoggedIn && (
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
              ❌ Please sign in to access admin features.
            </p>
          )}
          <footer className="footer">
            <GoogleLogin />
          </footer>
        </>
      )}
    </div>
  );
}

export default App;