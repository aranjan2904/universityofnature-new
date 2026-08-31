import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFaculty.css";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/faculty`;

function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    department: "",
    qualification: "",
    bio: "",
  });

  const loadFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
    } catch (error) {
      console.error("Failed to load faculty:", error);
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      designation: "",
      department: "",
      qualification: "",
      bio: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        alert("Faculty updated successfully!");
      } else {
        await axios.post(API_URL, form);
        alert("Faculty added successfully!");
      }

      resetForm();
      await loadFaculty();
    } catch (error) {
      console.error("Failed to save faculty:", error);
      alert("Failed to save faculty.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);

    setForm({
      name: member.name || "",
      designation: member.designation || "",
      department: member.department || "",
      qualification: member.qualification || "",
      bio: member.bio || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this faculty member?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      setFaculty((current) =>
        current.filter((member) => member.id !== id)
      );

      alert("Faculty deleted successfully!");
    } catch (error) {
      console.error("Failed to delete faculty:", error);
      alert("Failed to delete faculty.");
    }
  };

  return (
    <main className="admin-faculty-page">

      <section className="admin-faculty-header">
        <p>ADMIN PANEL</p>

        <h1>
          {editingId ? "Edit Faculty" : "Faculty Management"}
        </h1>

        <span>
          Manage faculty members and their information.
        </span>
      </section>

      <section className="faculty-form-card">

        <h2>
          {editingId ? "Edit Faculty Member" : "Add Faculty Member"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Faculty name"
            required
          />

          <label>Designation</label>

          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Example: Professor"
            required
          />

          <label>Department</label>

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Example: Environmental Science"
            required
          />

          <label>Qualification</label>

          <input
            type="text"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            placeholder="Example: Ph.D. Environmental Science"
            required
          />

          <label>Bio</label>

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Faculty biography"
            rows="6"
            required
          />

          <div className="faculty-form-buttons">

            <button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                ? "Update Faculty"
                : "Add Faculty"}
            </button>

            {editingId && (
              <button
                type="button"
                className="faculty-cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      <section className="admin-faculty-list">

        <h2>Existing Faculty</h2>

        <div className="faculty-admin-grid">

          {faculty.map((member) => (

            <article
              className="faculty-admin-card"
              key={member.id}
            >

              <div className="faculty-admin-content">

                <h3>{member.name}</h3>

                <p>
                  <strong>{member.designation}</strong>
                </p>

                <p>
                  Department: {member.department}
                </p>

                <p>
                  Qualification: {member.qualification}
                </p>

                <p>{member.bio}</p>

                <div className="faculty-actions">

                  <button
                    className="faculty-edit-button"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </button>

                  <button
                    className="faculty-delete-button"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}

export default AdminFaculty;