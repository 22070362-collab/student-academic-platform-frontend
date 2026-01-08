import React from "react";

const StudentGrades = () => {
  const grades = [
    { course: "Database", score: 8.5 },
    { course: "Web Development", score: 9.0 },
  ];

  return (
    <div>
      <h3>My Grades</h3>
      <ul>
        {grades.map((g, index) => (
          <li key={index}>
            {g.course}: {g.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentGrades;
