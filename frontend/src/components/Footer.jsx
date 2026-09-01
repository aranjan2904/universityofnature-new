function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      e.target.reset();
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        {/* Left Section - Brand */}
        <div className="footer-section footer-brand">
          <div className="footer-logo-group">
            <img src="/logo.svg" alt="University of Nature Logo" className="footer-logo-image" />
            <span className="footer-brand-text">University of Nature</span>
          </div>
          <p className="footer-tagline">
            Pioneering sustainable education for a greener tomorrow. Join us in creating a world where knowledge meets nature.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">𝕏</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
          </div>
        </div>

        {/* Middle Section - Get in Touch */}
        <div className="footer-section footer-contact">
          <h4>GET IN TOUCH</h4>
          <div className="contact-item">
            <span className="contact-label">VILLAGE CAMPUS</span>
            <p>Gadgadwa (Tora), Rehla, Palamu, Jharkhand - 822124</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">OFFICE ADDRESS</span>
            <p>2 No Town, Pratapnagar, Redma, P.O. Redma South, Medininagar, Palamu, Jharkhand - 822102</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">CALL US</span>
            <p>
              <a href="tel:9470378404">9470378404</a>, 
              <a href="tel:7992345197">7992345197</a>, 
              <a href="tel:7033433128">7033433128</a>
            </p>
          </div>
          <div className="contact-item">
            <span className="contact-label">EMAIL</span>
            <p>
              <a href="mailto:universityofnature65@gmail.com">universityofnature65@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Right Section - Explore */}
        <div className="footer-section footer-explore">
          <h4>EXPLORE</h4>
          <a href="/">Home</a>
          <a href="/#mission">About Us</a>
          <a href="/#programs">Programs</a>
          <a href="/#faculty">Faculty</a>
          <a href="/#gallery">Gallery</a>
          <a href="/#contact">Contact</a>
        </div>

        {/* Far Right Section - Newsletter */}
        <div className="footer-section footer-newsletter">
          <h4>NEWSLETTER</h4>
          <p>Get updates on new programs, field research, and campus events.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 University of Nature. All rights reserved.</p>
        <div className="footer-links-bottom">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
