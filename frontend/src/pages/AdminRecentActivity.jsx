import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRecentActivity.css";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/recent-activity`;

function AdminRecentActivity() {
  const [activities, setActivities] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const loadActivities = async () => {
    try {
      const response = await axios.get(API_URL);
      // Sort by order
      const sorted = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setActivities(sorted);
    } catch (error) {
      console.error("Failed to load activities:", error);
    }
  };

  useEffect(() => {
    loadActivities();
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
      alert("Recent activity uploaded successfully!");

      setFile(null);
      setTitle("");
      setDescription("");
      document.getElementById("activity-file").value = "";

      await loadActivities();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setActivities((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete activity.");
    }
  };

  const handleToggleEnabled = async (id, currentEnabled) => {
    try {
      await axios.put(`${API_URL}/${id}`, { enabled: !currentEnabled });
      await loadActivities();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update activity status.");
    }
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (targetIndex) => {
    if (draggedItem === null || draggedItem === targetIndex) return;

    const newActivities = [...activities];
    const [draggedActivity] = newActivities.splice(draggedItem, 1);
    newActivities.splice(targetIndex, 0, draggedActivity);

    // Update order
    try {
      for (let i = 0; i < newActivities.length; i++) {
        await axios.patch(`${API_URL}/${newActivities[i].id}/order`, { order: i });
      }
      setActivities(newActivities);
    } catch (error) {
      console.error("Failed to update order:", error);
      await loadActivities(); // Revert on error
    }

    setDraggedItem(null);
  };

  return (
    <main className="admin-recent-activity-page">
      <div className="admin-activity-header">
        <p>ADMIN PANEL</p>
        <h1>Recent Activity Management</h1>
        <span>Upload and manage recent activity photos for the carousel.</span>
      </div>

      <section className="activity-upload-card">
        <h2>Upload New Activity</h2>

        <form onSubmit={handleSubmit}>
          <label>Image</label>
          <input
            id="activity-file"
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files[0])}
          />

          <label>Title</label>
          <input
            type="text"
            placeholder="Enter activity title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter activity description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Activity"}
          </button>
        </form>
      </section>

      <section className="admin-activity-list">
        <h2>Recent Activities ({activities.length})</h2>
        <p className="info-text">Drag to reorder. Click enable/disable to control display on homepage.</p>

        <div className="admin-activity-grid">
          {activities.map((item, index) => (
            <article
              className={`admin-activity-item ${!item.enabled ? "disabled" : ""}`}
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <div className="item-image-wrapper">
                <img src={item.imageUrl} alt={item.title} />
                <span className="order-badge">#{index + 1}</span>
                {!item.enabled && <span className="disabled-badge">Disabled</span>}
              </div>

              <div className="item-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="item-actions">
                  <button
                    className={`status-button ${item.enabled ? "enabled" : "disabled"}`}
                    onClick={() => handleToggleEnabled(item.id, item.enabled)}
                  >
                    {item.enabled ? "✓ Enabled" : "✗ Disabled"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {activities.length === 0 && (
          <p className="empty-message">No recent activities uploaded yet. Upload your first activity above!</p>
        )}
      </section>
    </main>
  );
}

export default AdminRecentActivity;
