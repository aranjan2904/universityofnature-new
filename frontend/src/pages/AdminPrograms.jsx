import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPrograms.css";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/programs`;

function AdminPrograms() {
  const [programs, setPrograms] = useState([]);

  const [form, setForm] = useState({
    name: "",
    degree: "",
    duration: "",
    description: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPrograms = async () => {
    try {
      const response = await axios.get(API_URL);
      setPrograms(response.data);
    } catch (error) {
      console.error("Failed to load programs:", error);
    }
  };

  useEffect(() => {
    loadPrograms();
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
      degree: "",
      duration: "",
      description: "",
      imageUrl: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        alert("Program updated successfully!");
      } else {
        await axios.post(API_URL, form);
        alert("Program created successfully!");
      }

      resetForm();
      await loadPrograms();
    } catch (error) {
      console.error("Failed to save program:", error);
      alert("Failed to save program.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program) => {
    setEditingId(program.id);

    setForm({
      name: program.name || "",
      degree: program.degree || "",
      duration: program.duration || "",
      description: program.description || "",
      imageUrl: program.imageUrl || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      setPrograms((current) =>
        current.filter((program) => program.id !== id)
      );

      alert("Program deleted successfully!");
    } catch (error) {
      console.error("Failed to delete program:", error);
      alert("Failed to delete program.");
    }
  };

  return (
    <main className="admin-programs-page">

      <section className="admin-programs-header">
        <p>ADMIN PANEL</p>

        <h1>
          {editingId ? "Edit Program" : "Program Management"}
        </h1>

        <span>
          Manage university programs and course information.
        </span>
      </section>

      <section className="program-form-card">
        <h2>
          {editingId ? "Edit Program" : "Add New Program"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>Program Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Example: Environmental Science"
            required
          />

          <label>Degree</label>
          <input
            type="text"
            name="degree"
            value={form.degree}
            onChange={handleChange}
            placeholder="Example: Bachelor of Science"
            required
          />

          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Example: 4 Years"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Program description"
            rows="5"
            required
          />

          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />

          <div className="program-form-buttons">
            <button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                ? "Update Program"
                : "Add Program"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>

        </form>
      </section>

      <section className="admin-program-list">

        <h2>Existing Programs</h2>

        <div className="program-admin-grid">

          {programs.map((program) => (
            <article
              className="program-admin-card"
              key={program.id}
            >

              {program.imageUrl && (
                <img
                  src={program.imageUrl}
                  alt={program.name}
                />
              )}

              <div className="program-admin-content">

                <h3>{program.name}</h3>

                <p>
                  <strong>Degree:</strong> {program.degree}
                </p>

                <p>
                  <strong>Duration:</strong> {program.duration}
                </p>

                <p>{program.description}</p>

                <div className="program-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(program)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(program.id)}
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

export default AdminPrograms;