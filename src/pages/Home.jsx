import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  Shirt,
  Gem,
  Watch,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import shoppingImage from "../assets/shopping-hero.png";
import "./Home.css";

function Home() {
  const categories = [
    { name: "Electronics", icon: Smartphone, count: "120+ Products" },
    { name: "Fashion", icon: Shirt, count: "250+ Products" },
    { name: "Jewellery", icon: Gem, count: "80+ Products" },
    { name: "Accessories", icon: Watch, count: "100+ Products" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on eligible orders.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "Safe and secure checkout.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're always here to help.",
    },
  ];

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-tag">
            NEW COLLECTION 2026
          </span>

          <h1>
            Discover Your
            <span> Perfect Style.</span>
          </h1>

          <p className="hero-description">
            Explore our latest collection of premium products.
            Find everything you love in one place and enjoy
            a seamless shopping experience.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="shop-btn">
              Shop Now <ArrowRight size={18} />
            </Link>

            <Link to="/categories" className="explore-btn">
              Explore Categories
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <p>Products</p>
            </div>

            <div>
              <h3>10K+</h3>
              <p>Customers</p>
            </div>

            <div>
              <h3>4.8/5</h3>
              <p>Rating</p>
            </div>
          </div>

        </div>

        <div className="hero-image">
          <img src={shoppingImage} alt="ShopEase shopping collection" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <Icon size={25} />
              </div>

              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          );
        })}

      </section>

      {/* Categories Section */}
      <section className="categories-section">

        <div className="section-heading">
          <div>
            <span className="section-tag">OUR COLLECTION</span>
            <h2>Shop by Category</h2>
            <p>Explore our carefully selected collections.</p>
          </div>

          <Link to="/categories" className="view-all">
            View All <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-grid">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                to="/categories"
                className="category-card"
                key={index}
              >
                <div className="category-icon">
                  <Icon size={35} />
                </div>

                <h3>{category.name}</h3>

                <p>{category.count}</p>

                <div className="category-arrow">
                  <ArrowRight size={18} />
                </div>
              </Link>
            );
          })}

        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-section">

        <div className="featured-content">
          <span className="section-tag">SPECIAL COLLECTION</span>

          <h2>
            Find Something
            <span> You'll Love.</span>
          </h2>

          <p>
            Discover amazing products at great prices.
            Your next favourite item is just one click away.
          </p>

          <Link to="/products" className="shop-btn">
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>

      </section>

    </main>
  );
}

export default Home;