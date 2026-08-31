import { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/gallery`;

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(API_URL);
        setGallery(response.data);
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
    <main className="gallery-page">
      <section className="gallery-hero">
        <p className="gallery-label">UNIVERSITY OF NATURE</p>

        <h1>Our Gallery</h1>

        <p>
          Explore moments, people, places, and projects from the
          University of Nature.
        </p>
      </section>

      <section className="gallery-grid">
        {gallery.map((item) => (
          <article className="gallery-card" key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="gallery-image"
              onClick={() => setSelectedImage(item.imageUrl)}
            />

            <div className="gallery-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

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
    </main>
  );
}

export default Gallery;