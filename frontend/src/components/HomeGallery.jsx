import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./HomeGallery.css";

const API_URL = `${API_BASE_URL}/api/gallery`;

function HomeGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const LIMIT = 4; // Show only 4 images on home page

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(API_URL);
        setGallery(response.data.slice(0, LIMIT));
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <p className="gallery-message">Loading gallery...</p>;
  }

  return (
    <section className="home-gallery">
      <div className="gallery-header">
        <h2>Gallery</h2>
        <p>Explore moments, people, places, and projects from the University of Nature.</p>
      </div>

      <div className="home-gallery-grid">
        {gallery.map((item) => (
          <article className="gallery-card" key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="gallery-image"
              onClick={() => setSelectedImage(item.imageUrl)}
            />
            <div className="gallery-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="gallery-footer">
        <button 
          className="view-more-btn" 
          onClick={() => navigate("/gallery")}
        >
          View All Gallery →
        </button>
      </div>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size gallery"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default HomeGallery;
