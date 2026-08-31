import { useEffect, useState } from "react";
import { getFaculty } from "../api/facultyApi";
import "./Faculty.css";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await getFaculty();
        setFaculty(data);
      } catch (err) {
        setError("Unable to load faculty.");
      } finally {
        setLoading(false);
      }
    };

    loadFaculty();
  }, []);

  if (loading) {
    return (
      <main className="faculty-page">
        <div className="faculty-status">Loading faculty...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="faculty-page">
        <div className="faculty-status error">{error}</div>
      </main>
    );
  }

  return (
    <main className="faculty-page">
      <section className="faculty-hero">
        <p>OUR FACULTY</p>
        <h1>Meet Our Faculty</h1>
        <span>
          Learn from experienced educators and professionals dedicated to
          nature, sustainability, and practical education.
        </span>
      </section>

      <section className="faculty-grid">
        {faculty.map((member) => (
          <article className="faculty-card" key={member.id}>
            <div className="faculty-image-wrap">
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} />
              ) : (
                <div className="faculty-image-placeholder">UN</div>
              )}

              <span className="faculty-badge">{member.department}</span>
            </div>

            <div className="faculty-content">
              <p className="faculty-designation">{member.designation}</p>
              <h2>{member.name}</h2>

              <div className="faculty-meta">
                <div>
                  <small>DEPARTMENT</small>
                  <strong>{member.department}</strong>
                </div>

                <div>
                  <small>QUALIFICATION</small>
                  <strong>{member.qualification}</strong>
                </div>
              </div>

              {member.bio && <p className="faculty-bio">{member.bio}</p>}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Faculty;