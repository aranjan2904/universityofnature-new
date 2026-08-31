import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-circle">UN</div>
        <span>University of Nature</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <a href="/#mission">Mission</a>
        <a href="/#programs">Programs</a>
        <a href="/#faculty">Faculty</a>
        <a href="/#gallery">Gallery</a>
        <a href="/#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
