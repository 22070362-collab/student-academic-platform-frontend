import React, { useState } from "react";

const AttendanceMarking = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyen Van A", status: "Present" },
    { id: 2, name: "Tran Thi B", status: "Absent" },
  ]);

  const updateStatus = (id, status) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <div>
      <h3>Take Attendance</h3>
      {students.map((s) => (
        <div key={s.id}>
          {s.name} - 
          <select
            value={s.status}
            onChange={(e) => updateStatus(s.id, e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Excused</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AttendanceMarking;
