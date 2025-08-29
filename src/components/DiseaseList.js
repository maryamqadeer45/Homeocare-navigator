import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function DiseaseList({ language }) {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "diseases"),
      where("language", "==", language)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const diseaseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDiseases(diseaseData);
    });

    return () => unsubscribe();
  }, [language]);

  return (
    <div>
      <h3>Disease List ({language})</h3>
      {diseases.length === 0 ? (
        <p>No diseases found.</p>
      ) : (
        diseases.map((disease) => (
          <div
            key={disease.id}
            className={`list-item ${language === "Urdu" ? "urdu-text" : ""}`}
          >
            <h4>{disease.disease || "Unnamed Disease"}</h4>
            <p><strong>Organ:</strong> {disease.organ || "Unknown Organ"}</p>
            <p><strong>Suggested Remedy:</strong> {disease.suggestedRemedy || "Not Specified"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DiseaseList;