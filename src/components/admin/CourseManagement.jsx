import React, { useEffect, useState } from "react";
import api from "../../services/api";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", credits: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/admin/courses");
    setCourses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/admin/courses/${editingId}`, form);
    } else {
      await api.post("/admin/courses", form);
    }

    resetForm();
    fetchCourses();
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setForm({
      name: course.name,
      code: course.code,
      credits: course.credits,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await api.delete(`/admin/courses/${id}`);
      fetchCourses();
    }
  };

  const resetForm = () => {
    setForm({ name: "", code: "", credits: "" });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2>Course Management</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Course Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="code" placeholder="Course Code" value={form.code} onChange={handleChange} required />
        <input type="number" name="credits" placeholder="Credits" value={form.credits} onChange={handleChange} required />

        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>{c.credits}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
