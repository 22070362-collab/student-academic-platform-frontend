import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";

import StudentDashboard from "./components/student/StudentDashboard";
import StudentGrades from "./components/student/StudentGrades";
import StudentAttendance from "./components/student/StudentAttendance";

import AttendanceMarking from "./components/lecturer/AttendanceMarking";
import StudentManagement from "./components/admin/StudentManagement";

const App = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginPage />;

  if (user.role === "student") {
    return (
      <div>
        <StudentDashboard />
        <StudentGrades />
        <StudentAttendance />
      </div>
    );
  }

  if (user.role === "lecturer") {
    return (
      <div>
        <h2>Lecturer Dashboard</h2>
        <AttendanceMarking />
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <StudentManagement />
      </div>
    );
  }

  return <div>Unauthorized</div>;
};

export default App;
