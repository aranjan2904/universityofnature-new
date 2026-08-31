import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminGallery.css";
import { API_BASE_URL } from "../config";


const API_URL = `${API_BASE_URL}/api/gallery`;

function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const loadGallery = async () => {
    try {
      const response = await axios.get(API_URL);
      setGallery(response.data);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      await axios.post(`${API_URL}/upload`, formData);

      alert("Gallery image uploaded successfully!");

      setFile(null);
      setTitle("");
      setDescription("");

      document.getElementById("gallery-file").value = "";

      await loadGallery();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setGallery((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete image.");
    }
  };

  return (
    <main className="admin-gallery-page">
      <div className="admin-gallery-header">
        <p>ADMIN PANEL</p>
        <h1>Gallery Management</h1>
        <span>Upload and manage your university gallery.</span>
      </div>

      <section className="gallery-upload-card">
        <h2>Upload New Image</h2>

        <form onSubmit={handleSubmit}>
          <label>Image</label>
          <input
            id="gallery-file"
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files[0])}
          />

          <label>Title</label>
          <input
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter image description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </section>

      <section className="admin-gallery-list">
        <h2>Existing Gallery</h2>

        <div className="admin-gallery-grid">
          {gallery.map((item) => (
            <article className="admin-gallery-item" key={item.id}>
              <img src={item.imageUrl} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminGallery;