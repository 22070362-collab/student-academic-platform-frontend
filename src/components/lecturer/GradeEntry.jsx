import React, { useState } from "react";

const GradeEntry = () => {
  const [grades, setGrades] = useState([
    { id: 1, name: "Nguyen Van A", mid: "", final: "" },
  ]);

  const handleChange = (id, field, value) => {
    setGrades(grades.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  return (
    <div>
      <h3>Enter Grades</h3>
      {grades.map((g) => (
        <div key={g.id}>
          {g.name} - 
          Mid: <input type="number" value={g.mid} onChange={(e) => handleChange(g.id, "mid", e.target.value)} />
          Final: <input type="number" value={g.final} onChange={(e) => handleChange(g.id, "final", e.target.value)} />
        </div>
      ))}
    </div>
  );
};

export default GradeEntry;
