import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    courseId: "",
    lecturerId: "",
    semester: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchCourses();
    fetchLecturers();
  }, []);

  const fetchClasses = async () => {
    const res = await api.get("/admin/classes");
    setClasses(res.data);
  };

  const fetchCourses = async () => {
    const res = await api.get("/admin/courses");
    setCourses(res.data);
  };

  const fetchLecturers = async () => {
    const res = await api.get("/admin/lecturers");
    setLecturers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/admin/classes/${editingId}`, form);
    } else {
      await api.post("/admin/classes", form);
    }

    resetForm();
    fetchClasses();
  };

  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setForm({
      name: cls.name,
      courseId: cls.courseId,
      lecturerId: cls.lecturerId,
      semester: cls.semester,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this class?")) {
      await api.delete(`/admin/classes/${id}`);
      fetchClasses();
    }
  };

  const resetForm = () => {
    setForm({ name: "", courseId: "", lecturerId: "", semester: "" });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2>Class Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="courseId" value={form.courseId} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select name="lecturerId" value={form.lecturerId} onChange={handleChange} required>
          <option value="">Select Lecturer</option>
          {lecturers.map((l) => (
            <option key={l.id} value={l.id}>{l.fullName}</option>
          ))}
        </select>

        <input
          type="text"
          name="semester"
          placeholder="Semester (e.g. 2025A)"
          value={form.semester}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Class" : "Add Class"}
        </button>

        {editingId && <button onClick={resetForm}>Cancel</button>}
      </form>

      {/* TABLE */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Course</th>
            <th>Lecturer</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.id}>
              <td>{index + 1}</td>
              <td>{cls.name}</td>
              <td>{cls.courseName}</td>
              <td>{cls.lecturerName}</td>
              <td>{cls.semester}</td>
              <td>
                <button onClick={() => handleEdit(cls)}>Edit</button>
                <button onClick={() => handleDelete(cls.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagement;
