import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  const frameworks = [
    {
      title: "Jal (Water)",
      label: "JAL (WATER)",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      description:
        "Water is the essence of life. Our conservation programs focus on harvesting, watershed management, and community stewardship to protect sources and restore aquatic ecosystems.",
      initiatives: [
        "Rainwater harvesting systems",
        "River restoration projects",
        "Water quality monitoring",
        "Community water education",
      ],
    },
    {
      title: "Jeevan (Life)",
      label: "JEEVAN (LIFE)",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      description:
        "Every form of life is sacred. We protect biodiversity, restore habitats, and promote harmonious coexistence between humans and nature.",
      initiatives: [
        "Wildlife habitat protection",
        "Endangered species conservation",
        "Biodiversity education",
        "Sustainable living practices",
      ],
    },
    {
      title: "Jungle (Forest)",
      label: "JUNGLE (FOREST)",
      image:
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
      description:
        "Forests are our planet's lungs. We restore degraded lands, protect existing forests, and train communities in sustainable forestry.",
      initiatives: [
        "Reforestation drives",
        "Forest protection",
        "Sustainable forestry",
        "Community forest education",
      ],
    },
    {
      title: "Jameen (Land)",
      label: "JAMEEN (LAND)",
      image:
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=80",
      description:
        "Healthy soil is the foundation of life. We implement regenerative agriculture, soil conservation, and sustainable farming practices.",
      initiatives: [
        "Soil health improvement",
        "Regenerative agriculture",
        "Sustainable farming",
        "Land restoration",
      ],
    },
    {
      title: "Jahan (World)",
      label: "JAHAN (WORLD)",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      description:
        "Our vision is global. We partner across borders to fight climate change and build sustainable futures for communities worldwide.",
      initiatives: [
        "Global climate action",
        "International partnerships",
        "Environmental education",
        "Sustainable development goals",
      ],
    },
  ];

  return (
    <main className="mission-page">

      {/* HERO */}
      <section className="mission-hero">
        <div className="mission-hero-content">
          <p className="mission-label">UNIVERSITY OF NATURE</p>

          <h1>Our Mission</h1>

          <p className="mission-subtitle">
            Taking every possible action to protect and preserve nature
            through the five core elements of life.
          </p>

          <div className="mission-buttons">
            <button onClick={() => navigate("/programs")}>
              Explore Programs
            </button>

            <button className="outline-button" onClick={() => navigate("/contact")}>
              Get Involved →
            </button>
          </div>
        </div>

        <div className="mission-hero-image">
          <img
            src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80"
            alt="Nature and waterfall"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="mission-stats">
        <div>
          <strong>25+</strong>
          <span>PROGRAMS</span>
        </div>

        <div>
          <strong>80+</strong>
          <span>COMMUNITY PARTNERS</span>
        </div>

        <div>
          <strong>140+</strong>
          <span>FIELD PROJECTS</span>
        </div>
      </section>

      {/* FIVE J'S */}
      <section className="framework-section">
        <p className="framework-label">THE FIVE J'S FRAMEWORK</p>

        <h2>The Five J's Framework</h2>

        <p className="framework-description">
          Our comprehensive approach to environmental conservation focuses
          on five interconnected elements that form the foundation of
          sustainable coexistence with nature.
        </p>

        <div className="framework-grid">
          {frameworks.map((item) => (
            <article className="framework-card" key={item.title}>

              <div className="framework-image">
                <img src={item.image} alt={item.title} />

                <div className="framework-image-label">
                  <span>◉</span>
                  {item.label}
                </div>
              </div>

              <div className="framework-content">
                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <span className="initiative-title">
                  KEY INITIATIVES
                </span>

                <ul>
                  {item.initiatives.map((initiative) => (
                    <li key={initiative}>
                      <span>✓</span>
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>

            </article>
          ))}
        </div>
      </section>

    </main>
  );
}

export default About;