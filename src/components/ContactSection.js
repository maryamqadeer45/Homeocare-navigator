import React from "react";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact Us</h2>
      <p>We're here to help you find the right remedy. Reach out anytime.</p>

      <div className="contact-details">
        <div>
          <strong>📞 WhatsApp:</strong> +92 300 1234567
        </div>
        <div>
          <strong>📧 Email:</strong> homeocare@example.com
        </div>
        <div>
          <strong>🕒 Doctor Timings:</strong> Mon–Sat, 9am to 5pm
        </div>
      </div>
    </section>
  );
}

export default ContactSection;