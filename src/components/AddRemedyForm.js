import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddRemedyForm() {
  const [organ, setOrgan] = useState("");
  const [disease, setDisease] = useState("");
  const [remedy, setRemedy] = useState("");
  const [dosage, setDosage] = useState("");
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organ || !disease || !remedy || !dosage) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "remedies"), {
        organ,
        disease,
        remedy,
        dosage,
        language,
        timestamp: Timestamp.now()
      });

      setMessage("✅ Remedy added successfully.");
      setOrgan("");
      setDisease("");
      setRemedy("");
      setDosage("");
    } catch (error) {
      console.error("❌ Error adding remedy:", error);
      setMessage("❌ Failed to add remedy.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Remedy</h3>
      <input
        type="text"
        placeholder="Organ"
        value={organ}
        onChange={(e) => setOrgan(e.target.value)}
      />
      <input
        type="text"
        placeholder="Disease"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />
      <input
        type="text"
        placeholder="Remedy"
        value={remedy}
        onChange={(e) => setRemedy(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="English">English</option>
        <option value="Urdu">Urdu</option>
      </select>
      <button type="submit">Add Remedy</button>
      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
    </form>
  );
}

export default AddRemedyForm;