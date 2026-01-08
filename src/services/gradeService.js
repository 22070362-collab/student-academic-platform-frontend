import api from "./api";

const gradeService = {
  // Lecturer nhập điểm
  getStudentsByClass: (classId) => {
    return api.get(`/lecturer/classes/${classId}/students`);
  },

  submitGrades: (classId, grades) => {
    return api.post(`/lecturer/classes/${classId}/grades`, { grades });
  },

  updateGrade: (gradeId, data) => {
    return api.put(`/lecturer/grades/${gradeId}`, data);
  },

  // Admin xem báo cáo điểm
  getGradeReport: (classId) => {
    return api.get(`/admin/reports/grades?classId=${classId}`);
  },
};

export default gradeService;
