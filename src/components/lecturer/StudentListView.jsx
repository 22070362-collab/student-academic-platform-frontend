import React from "react";

const StudentListView = () => {
  const students = [
    { id: 1, name: "Nguyen Van A" },
    { id: 2, name: "Tran Thi B" },
  ];

  return (
    <div>
      <h3>Student List</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentListView;
