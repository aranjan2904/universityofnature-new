import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <main className="admin-page">

      <nav className="admin-nav">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/programs">Programs</Link>
        <Link to="/admin/faculty">Faculty</Link>
        <Link to="/admin/gallery">Gallery</Link>
        <Link to="/admin/messages">Messages</Link>
      </nav>

      <section className="admin-header">
        <p>UNIVERSITY OF NATURE</p>

        <h1>Admin Dashboard</h1>

        <span>Manage your website content</span>
      </section>

      <section className="admin-grid">

        <Link to="/admin/programs" className="admin-card">
          <span>01</span>
          <h2>Programs</h2>
          <p>Add, edit and delete university programs.</p>
        </Link>

        <Link to="/admin/faculty" className="admin-card">
          <span>02</span>
          <h2>Faculty</h2>
          <p>Manage faculty members and their information.</p>
        </Link>

        <Link to="/admin/gallery" className="admin-card">
          <span>03</span>
          <h2>Gallery</h2>
          <p>Upload and manage gallery images.</p>
        </Link>

        <Link to="/admin/messages" className="admin-card">
          <span>04</span>
          <h2>Messages</h2>
          <p>View messages submitted through the contact form.</p>
        </Link>

      </section>

    </main>
  );
}

export default Admin;