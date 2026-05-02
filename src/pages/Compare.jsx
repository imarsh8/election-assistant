import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://backend-220185214627.us-central1.run.app";

const Compare = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [aiData, setAiData] = useState({ summary: "", winner: "", analysis: {} });
  const [state, setState] = useState("Haryana");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, [state]);

  const fetchCandidates = async () => {
    setLoading(true);
    const res = await axios.get(`${API_BASE}/candidates/${state}`);
    setCandidates(res.data);
    setSelectedIds([]);
    setLoading(false);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const handleCompare = async () => {
    const res = await axios.post(`${API_BASE}/compare-ai`, {
      candidateIds: selectedIds
    });

    setAiData(res.data);
  };

  return (
    <div>
      <h2>AI Compare</h2>

      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option>Haryana</option>
        <option>Punjab</option>
        <option>Delhi</option>
      </select>

      <div style={{ display: "flex", gap: 10 }}>
        {candidates.map((c) => (
          <div
            key={c.id}
            onClick={() => toggleSelect(c.id)}
            style={{
              border: selectedIds.includes(c.id) ? "2px solid green" : "1px solid gray",
              padding: 10,
              cursor: "pointer"
            }}
          >
            {c.name}
          </div>
        ))}
      </div>

      <button onClick={handleCompare}>Compare</button>

      <h3>Summary: {aiData.summary}</h3>
      <h3>Winner: {aiData.winner}</h3>

      {Object.entries(aiData.analysis || {}).map(([name, data]) => (
        <div key={name}>
          <h4>{name}</h4>
          <p>Strengths: {data.strengths?.join(", ")}</p>
          <p>Weaknesses: {data.weaknesses?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Compare;