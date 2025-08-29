import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddDiseaseForm() {
  const [organ, setOrgan] = useState("");
  const [disease, setDisease] = useState("");
  const [suggestedRemedy, setSuggestedRemedy] = useState("");
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organ || !disease || !suggestedRemedy) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "diseases"), {
        organ,
        disease,
        suggestedRemedy,
        language,
        timestamp: Timestamp.now()
      });

      setMessage("✅ Disease added successfully.");
      setOrgan("");
      setDisease("");
      setSuggestedRemedy("");
    } catch (error) {
      console.error("❌ Error adding disease:", error);
      setMessage("❌ Failed to add disease.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Disease</h3>
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
        placeholder="Suggested Remedy"
        value={suggestedRemedy}
        onChange={(e) => setSuggestedRemedy(e.target.value)}
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="English">English</option>
        <option value="Urdu">Urdu</option>
      </select>
      <button type="submit">Add Disease</button>
      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
    </form>
  );
}

export default AddDiseaseForm;