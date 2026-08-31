import { useState } from "react";
import { sendContactMessage } from "../api/contactApi";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    try {
      await sendContactMessage(formData);

      setStatus("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("Unable to send message. Please try again.");
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p>GET IN TOUCH</p>
        <h1>Contact Us</h1>
        <span>
          Have a question about our university or programs?
          We'd love to hear from you.
        </span>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <h2>Let's connect</h2>

          <p>
            Reach out to us for admissions, programs, campus information,
            or any other questions.
          </p>

          <div>
            <strong>Email</strong>
            <p>info@universityofnature.edu</p>
          </div>

          <div>
            <strong>Location</strong>
            <p>University of Nature Campus</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </label>

          <button type="submit">Send Message</button>

          {status && <p className="contact-status">{status}</p>}
        </form>
      </section>
    </main>
  );
}

export default Contact;