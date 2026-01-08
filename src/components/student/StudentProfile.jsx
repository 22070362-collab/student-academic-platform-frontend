import React from "react";

const StudentProfile = () => {
  const profile = {
    code: "SV001",
    name: "Nguyen Van A",
    major: "Information Systems",
    email: "sv001@student.edu.vn",
  };

  return (
    <div>
      <h3>My Profile</h3>
      <p><b>Student Code:</b> {profile.code}</p>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Major:</b> {profile.major}</p>
      <p><b>Email:</b> {profile.email}</p>
    </div>
  );
};

export default StudentProfile;
