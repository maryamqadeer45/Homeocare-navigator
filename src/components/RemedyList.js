import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./RemedyList.css";

function RemedyList({ language }) {
  const [remedies, setRemedies] = useState([]);
  const [selectedOrgan, setSelectedOrgan] = useState("All");

  useEffect(() => {
    const q = query(
      collection(db, "remedies"),
      where("language", "==", language)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remedyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRemedies(remedyData);
    });

    return () => unsubscribe();
  }, [language]);

  const filteredRemedies =
    selectedOrgan === "All"
      ? remedies
      : remedies.filter((r) => r.organ === selectedOrgan);

  const uniqueOrgans = [
    "All",
    ...Array.from(new Set(remedies.map((r) => r.organ))).filter(Boolean)
  ];

  return (
    <section className="remedy-section">
      <h2 className="section-title">Remedy Highlights ({language})</h2>

      {/* ✅ Organ Filter Dropdown */}
      <div className="filter-bar">
        <label htmlFor="organ-select">Filter by Organ:</label>
        <select
          id="organ-select"
          value={selectedOrgan}
          onChange={(e) => setSelectedOrgan(e.target.value)}
        >
          {uniqueOrgans.map((organ) => (
            <option key={organ} value={organ}>
              {organ}
            </option>
          ))}
        </select>
      </div>

      {filteredRemedies.length === 0 ? (
        <p className="no-remedy">No remedies found.</p>
      ) : (
        <div className="remedy-grid">
          {filteredRemedies.map((remedy) => (
            <div
              key={remedy.id}
              className={`remedy-card ${language === "Urdu" ? "urdu-text" : ""}`}
            >
              <h3>{remedy.remedy}</h3>
              <p><strong>Disease:</strong> {remedy.disease}</p>
              <p><strong>Organ:</strong> {remedy.organ}</p>
              {remedy.diagnosis && <p><strong>Diagnosis:</strong> {remedy.diagnosis}</p>}
              <p><strong>Dosage:</strong> {remedy.dosage}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RemedyList;