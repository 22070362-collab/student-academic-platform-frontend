import React from "react";

const StudentManagement = () => {
  const students = [
    { id: 1, name: "Nguyen Van A", major: "IT" },
    { id: 2, name: "Tran Thi B", major: "Business" },
  ];

  return (
    <div>
      <h3>Student Management</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
