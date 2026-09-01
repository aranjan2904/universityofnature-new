import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="University of Nature Logo" className="logo-image" />
        <span>University of Nature</span>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-links">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <a href="/#mission" onClick={closeMenu}>Mission</a>
        <a href="/#programs" onClick={closeMenu}>Programs</a>
        <a href="/#faculty" onClick={closeMenu}>Faculty</a>
        <a href="/#gallery" onClick={closeMenu}>Gallery</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <a href="/#mission" onClick={closeMenu}>Mission</a>
        <a href="/#programs" onClick={closeMenu}>Programs</a>
        <a href="/#faculty" onClick={closeMenu}>Faculty</a>
        <a href="/#gallery" onClick={closeMenu}>Gallery</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
