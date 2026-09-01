import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./RecentActivity.css";

const API_URL = `${API_BASE_URL}/api/recent-activity`;

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_URL}?enabled=true`);
        setActivities(response.data);
      } catch (error) {
        console.error("Failed to load recent activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (!autoScroll || activities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [autoScroll, activities.length]);

  const handlePrev = () => {
    setAutoScroll(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activities.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoScroll(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
  };

  const handleDotClick = (index) => {
    setAutoScroll(false);
    setCurrentIndex(index);
  };

  if (loading) {
    return <p className="activity-message">Loading recent activities...</p>;
  }

  if (activities.length === 0) {
    return null;
  }

  const currentActivity = activities[currentIndex];

  return (
    <section className="recent-activity">
      <div className="activity-container">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <p>Latest happenings at University of Nature</p>
        </div>

        <div className="carousel">
          <div className="carousel-slide">
            <img
              src={currentActivity.imageUrl}
              alt={currentActivity.title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <h3>{currentActivity.title}</h3>
              <p>{currentActivity.description}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="carousel-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous activity"
          >
            ‹
          </button>
          <button
            className="carousel-btn next-btn"
            onClick={handleNext}
            aria-label="Next activity"
          >
            ›
          </button>

          {/* Dots Navigation */}
          <div className="carousel-dots">
            {activities.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to activity ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-scroll Indicator */}
          <div className="carousel-info">
            <span className="slide-counter">
              {currentIndex + 1} / {activities.length}
            </span>
            <button
              className={`auto-scroll-toggle ${autoScroll ? "active" : ""}`}
              onClick={() => setAutoScroll(!autoScroll)}
              aria-label="Toggle auto-scroll"
              title={autoScroll ? "Click to pause" : "Click to play"}
            >
              {autoScroll ? "▶ Auto" : "⏸ Paused"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentActivity;
