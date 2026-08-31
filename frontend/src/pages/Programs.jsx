import { useEffect, useState } from "react";
import { getPrograms } from "../api/programApi";
import "./Programs.css";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data);
      } catch (err) {
        setError("Unable to load programs.");
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  if (loading) {
    return <div className="program-status">Loading programs...</div>;
  }

  if (error) {
    return <div className="program-status">{error}</div>;
  }

  return (
    <main className="programs-page">

      <section className="programs-hero">
        <p>ACADEMIC CATALOG</p>
        <h1>University Courses & Programs</h1>
        <span>
          Explore structured, field-driven courses designed to build
          ecological leadership, practical skills, and community impact.
        </span>
      </section>

      <section className="programs-grid">
        {programs.map((program) => (
          <article className="program-card" key={program.id}>

            {program.imageUrl && (
              <div className="program-image">
                <img src={program.imageUrl} alt={program.name} />

                <div className="program-badges">
                  <span>UNN-{String(program.id).padStart(2, "0")}</span>
                  <span>{program.degree}</span>
                </div>
              </div>
            )}

            <div className="program-content">

              <h2>{program.name}</h2>

              <p className="program-description">
                {program.description}
              </p>

              <div className="program-info">
                <div>
                  <small>DURATION</small>
                  <strong>{program.duration}</strong>
                </div>

                <div>
                  <small>DEGREE</small>
                  <strong>{program.degree}</strong>
                </div>
              </div>

              <button>View Course Details</button>

            </div>
          </article>
        ))}
      </section>

    </main>
  );
}

export default Programs;