import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div style={{ width: "200px", background: "#ecf0f1", height: "100vh", padding: "10px" }}>
      <h4>Menu</h4>
      {user.role === "student" && (
        <>
          <div>Dashboard</div>
          <div>Profile</div>
          <div>Courses</div>
          <div>Grades</div>
          <div>Attendance</div>
        </>
      )}

      {user.role === "lecturer" && (
        <>
          <div>Classes</div>
          <div>Students</div>
          <div>Grades</div>
          <div>Attendance</div>
        </>
      )}

      {user.role === "admin" && (
        <>
          <div>Students</div>
          <div>Lecturers</div>
          <div>Courses</div>
          <div>Classes</div>
          <div>Reports</div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
