import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Reports = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalLecturers: 0,
    totalCourses: 0,
    totalClasses: 0,
  });

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [gradeReport, setGradeReport] = useState([]);
  const [attendanceReport, setAttendanceReport] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchGradeReport(selectedClass);
      fetchAttendanceReport(selectedClass);
    }
  }, [selectedClass]);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/admin/reports/summary");
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/admin/classes");
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchGradeReport = async (classId) => {
    try {
      const res = await api.get(`/admin/reports/grades?classId=${classId}`);
      setGradeReport(res.data);
    } catch (error) {
      console.error("Error fetching grade report:", error);
    }
  };

  const fetchAttendanceReport = async (classId) => {
    try {
      const res = await api.get(`/admin/reports/attendance?classId=${classId}`);
      setAttendanceReport(res.data);
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    }
  };

  return (
    <div className="p-4">
      <h2>📊 Reports & Statistics</h2>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div className="card">Students: {summary.totalStudents}</div>
        <div className="card">Lecturers: {summary.totalLecturers}</div>
        <div className="card">Courses: {summary.totalCourses}</div>
        <div className="card">Classes: {summary.totalClasses}</div>
      </div>

      {/* CLASS FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <label><b>Select Class:</b></label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">-- Choose Class --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* GRADE REPORT */}
      {selectedClass && (
        <>
          <h3>📘 Grade Report</h3>
          <table border="1" width="100%" cellPadding="8" style={{ marginBottom: "30px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Code</th>
                <th>Student Name</th>
                <th>Midterm</th>
                <th>Final</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {gradeReport.length > 0 ? (
                gradeReport.map((g, index) => (
                  <tr key={g.studentId}>
                    <td>{index + 1}</td>
                    <td>{g.studentCode}</td>
                    <td>{g.studentName}</td>
                    <td>{g.midterm}</td>
                    <td>{g.final}</td>
                    <td><b>{g.average}</b></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" align="center">No grade data</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ATTENDANCE REPORT */}
          <h3>🕒 Attendance Report</h3>
          <table border="1" width="100%" cellPadding="8">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Code</th>
                <th>Student Name</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {attendanceReport.length > 0 ? (
                attendanceReport.map((a, index) => (
                  <tr key={a.studentId}>
                    <td>{index + 1}</td>
                    <td>{a.studentCode}</td>
                    <td>{a.studentName}</td>
                    <td>{a.presentCount}</td>
                    <td>{a.absentCount}</td>
                    <td><b>{a.attendancePercent}%</b></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" align="center">No attendance data</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Reports;
