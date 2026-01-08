import api from "./api";

const attendanceService = {
  // ===== LECTURER =====
  createSession: (classId, date) => {
    return api.post(`/lecturer/classes/${classId}/sessions`, { date });
  },

  getSessionsByClass: (classId) => {
    return api.get(`/lecturer/classes/${classId}/sessions`);
  },

  markAttendance: (sessionId, attendanceList) => {
    return api.post(`/lecturer/sessions/${sessionId}/attendance`, {
      attendanceList,
    });
  },

  // ===== STUDENT =====
  getStudentAttendance: () => {
    return api.get("/student/attendance");
  },

  // ===== ADMIN =====
  getAttendanceReport: (classId) => {
    return api.get(`/admin/reports/attendance?classId=${classId}`);
  },
};

export default attendanceService;
