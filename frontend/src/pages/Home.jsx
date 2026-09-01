import Programs from "./Programs";
import Faculty from "./Faculty";
import Gallery from "./Gallery";
import Contact from "./Contact";
import About from "./About";
import HomeGallery from "../components/HomeGallery";
import RecentActivity from "../components/RecentActivity";
import Footer from "../components/Footer";

function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-page">
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-kicker">UNIVERSITY OF NATURE</p>
          <h1>Nature is our teacher.</h1>
          <p className="hero-description">
            We blend rigorous academics with field-based learning to prepare
            students for meaningful work in conservation, sustainability, and
            environmental leadership.
          </p>
          <div className="hero-tags">
            <span>RESEARCH</span>
            <span>CONSERVATION</span>
            <span>SUSTAINABILITY</span>
          </div>
          <div className="hero-buttons">
            <button onClick={() => scrollTo("programs")}>Explore Programs</button>
            <button className="secondary-button" onClick={() => scrollTo("contact")}>
              Get Involved
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <p>STUDENTS</p>
            <h2>4,800</h2>
            <span>Learning in the field across science, policy, and design.</span>
          </div>
          <div className="stat-card">
            <p>RESEARCH</p>
            <h2>120+</h2>
            <span>Active projects focused on climate resilience and biodiversity.</span>
          </div>
          <div className="featured-card">
            <p>FEATURED</p>
            <h2>Living laboratories for environmental innovation</h2>
            <span>
              Our campuses, forests, wetlands, and communities form the basis for
              hands-on education and practical action.
            </span>
            <a href="#mission">Learn more →</a>
          </div>
        </div>
      </section>

      <section id="recent-activity" className="home-section">
        <RecentActivity />
      </section>

      <section id="gallery" className="home-section">
        <HomeGallery />
      </section>

      <section id="mission" className="home-section">
        <About />
      </section>
      
      <section id="programs" className="home-section">
        <Programs />
      </section>
      <section id="faculty" className="home-section">
        <Faculty />
      </section>
      
      <section id="contact" className="home-section">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}

export default Home;
