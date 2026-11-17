import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";

import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  };

  return (
    <div className="contact-page">

      <div className="contact-heading">
        <span>GET IN TOUCH</span>
        <h1>Contact Us</h1>
        <p>
          Have questions? We'd love to hear from you.
          Send us a message.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Let's Talk</h2>

          <p>
            Our team is ready to help you with your
            shopping experience.
          </p>

          <div className="contact-info-item">
            <Mail />
            <div>
              <h4>Email</h4>
              <p>support@shopease.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <Phone />
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-info-item">
            <MapPin />
            <div>
              <h4>Location</h4>
              <p>Neyveli, Tamil Nadu, India</p>
            </div>
          </div>

        </div>

        <div className="contact-form-container">

          <h2>Send a Message</h2>

          {submitted && (
            <div className="contact-success">
              Your message has been submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="contact-field">
              <label>Your Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span>{errors.name}</span>
              )}
            </div>

            <div className="contact-field">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span>{errors.email}</span>
              )}
            </div>

            <div className="contact-field">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
              />

              {errors.subject && (
                <span>{errors.subject}</span>
              )}
            </div>

            <div className="contact-field">
              <label>Message</label>

              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
              />

              {errors.message && (
                <span>{errors.message}</span>
              )}
            </div>

            <button type="submit">
              Send Message
              <Send size={17} />
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;