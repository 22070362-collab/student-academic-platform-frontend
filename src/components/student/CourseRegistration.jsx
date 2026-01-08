import React, { useState } from "react";

const CourseRegistration = () => {
  const [courses] = useState([
    { id: 1, name: "Database Systems" },
    { id: 2, name: "Web Programming" },
  ]);

  const registerCourse = (course) => {
    alert(`Registered for ${course.name}`);
  };

  return (
    <div>
      <h3>Course Registration</h3>
      {courses.map((c) => (
        <div key={c.id}>
          {c.name}
          <button onClick={() => registerCourse(c)} style={{ marginLeft: "10px" }}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseRegistration;
