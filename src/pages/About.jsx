import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <span>ABOUT SHOPEASE</span>

        <h1>
          Shopping Made
          <span> Simple & Easy.</span>
        </h1>

        <p>
          Welcome to ShopEase, your destination for quality
          products, great prices and a seamless shopping experience.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make online shopping simple,
            convenient and enjoyable for everyone.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            We aim to provide quality products and excellent
            customer experiences through innovation.
          </p>
        </div>

        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <p>
            Discover a wide range of products, easy navigation,
            affordable prices and convenient shopping.
          </p>
        </div>

      </section>

    </div>
  );
}

export default About;