function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <div className="site-footer__brand">
            <div className="logo-circle">UN</div>
            <span>University of Nature</span>
          </div>
          <p>
            Building a greener future through education, research, and action.
          </p>
        </div>

        <div className="site-footer__links">
          <h4>Explore</h4>
          <a href="#mission">Mission</a>
          <a href="#programs">Programs</a>
          <a href="#faculty">Faculty</a>
          <a href="#gallery">Gallery</a>
        </div>

        <div className="site-footer__links">
          <h4>Connect</h4>
          <a href="#contact">Contact</a>
          <a href="/contact">Get in touch</a>
          <a href="mailto:info@universityofnature.edu">Email us</a>
        </div>
      </div>

      <div className="site-footer__bottom">
        © 2026 University of Nature. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
