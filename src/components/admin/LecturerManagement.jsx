import React, { useEffect, useState } from "react";
import api from "../../services/api";

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLecturers();
  }, []);

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
      await api.put(`/admin/lecturers/${editingId}`, form);
    } else {
      await api.post("/admin/lecturers", form);
    }

    resetForm();
    fetchLecturers();
  };

  const handleEdit = (l) => {
    setEditingId(l.id);
    setForm({
      fullName: l.fullName,
      email: l.email,
      department: l.department,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this lecturer?")) {
      await api.delete(`/admin/lecturers/${id}`);
      fetchLecturers();
    }
  };

  const resetForm = () => {
    setForm({ fullName: "", email: "", department: "" });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2>Lecturer Management</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((l, i) => (
            <tr key={l.id}>
              <td>{i + 1}</td>
              <td>{l.fullName}</td>
              <td>{l.email}</td>
              <td>{l.department}</td>
              <td>
                <button onClick={() => handleEdit(l)}>Edit</button>
                <button onClick={() => handleDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LecturerManagement;
