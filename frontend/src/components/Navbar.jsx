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
        <NavLink to="/mission">Mission</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <NavLink to="/faculty">Faculty</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;