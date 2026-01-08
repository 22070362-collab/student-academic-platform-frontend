import React from "react";

const StudentAttendance = () => {
  const attendance = [
    { date: "2025-01-10", status: "Present" },
    { date: "2025-01-17", status: "Late" },
    { date: "2025-01-24", status: "Absent" },
  ];

  return (
    <div>
      <h3>Attendance History</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a, index) => (
            <tr key={index}>
              <td>{a.date}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
