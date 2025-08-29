import React from "react";
import "./HomePage.css";

function HomePage({ onExplore }) {
  return (
    <div className="homepage">
      <header className="navbar">
        <h2 className="logo">Homeopathic Store</h2>
        <nav>
          <a href="#products">PRODUCTS</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
          <span className="cart-icon">🛒</span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Natural Remedies</h1>
          <p>
            Trusted homeopathic solutions for every organ — in English and Urdu.
          </p>
          <button onClick={onExplore}>SHOP NOW</button>
        </div>
        <div className="hero-image">
          {/* Optional: Add image here */}
        </div>
      </section>
    </div>
  );
}

export default HomePage;