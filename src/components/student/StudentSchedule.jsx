import React from "react";

const StudentSchedule = () => {
  const schedule = [
    { day: "Monday", subject: "Database", room: "A101" },
    { day: "Wednesday", subject: "Web", room: "B202" },
  ];

  return (
    <div>
      <h3>My Schedule</h3>
      <ul>
        {schedule.map((s, i) => (
          <li key={i}>
            {s.day} - {s.subject} - {s.room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSchedule;
