import { useEffect, useState } from "react";
import { getGallery } from "../api/galleryApi";
import "./Gallery.css";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await getGallery();
        setGallery(data);
      } catch (err) {
        setError("Unable to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return <div className="gallery-status">Loading gallery...</div>;
  }

  if (error) {
    return <div className="gallery-status">{error}</div>;
  }

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <p>CAMPUS LIFE</p>
        <h1>University Gallery</h1>
        <span>
          Explore moments from our campus, field activities, and
          nature-focused learning experiences.
        </span>
      </section>

      <section className="gallery-grid">
        {gallery.map((item) => (
          <article className="gallery-card" key={item.id}>
            <img src={item.imageUrl} alt={item.title} />

            <div className="gallery-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Gallery;