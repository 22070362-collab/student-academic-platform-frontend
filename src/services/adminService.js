import api from "./api";

const adminService = {
  // ===== STUDENTS =====
  getAllStudents: () => api.get("/admin/students"),
  createStudent: (data) => api.post("/admin/students", data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),

  // ===== LECTURERS =====
  getAllLecturers: () => api.get("/admin/lecturers"),
  createLecturer: (data) => api.post("/admin/lecturers", data),
  updateLecturer: (id, data) => api.put(`/admin/lecturers/${id}`, data),
  deleteLecturer: (id) => api.delete(`/admin/lecturers/${id}`),

  // ===== COURSES =====
  getAllCourses: () => api.get("/admin/courses"),
  createCourse: (data) => api.post("/admin/courses", data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),

  // ===== CLASSES =====
  getAllClasses: () => api.get("/admin/classes"),
  createClass: (data) => api.post("/admin/classes", data),
  updateClass: (id, data) => api.put(`/admin/classes/${id}`, data),
  deleteClass: (id) => api.delete(`/admin/classes/${id}`),

  // ===== REPORTS =====
  getSummaryReport: () => api.get("/admin/reports/summary"),
};

export default adminService;
