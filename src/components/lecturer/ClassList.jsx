import React from "react";

const ClassList = () => {
  const classes = [
    { id: 1, name: "IS101" },
    { id: 2, name: "SE202" },
  ];

  return (
    <div>
      <h3>My Classes</h3>
      <ul>
        {classes.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
