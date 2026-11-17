import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    name: "Electronics",
    icon: "💻",
    description: "Discover the latest electronic gadgets.",
    value: "electronics",
  },
  {
    name: "Jewelry",
    icon: "💎",
    description: "Explore beautiful jewelry collections.",
    value: "jewelery",
  },
  {
    name: "Men's Clothing",
    icon: "👕",
    description: "Find stylish outfits for men.",
    value: "men's clothing",
  },
  {
    name: "Women's Clothing",
    icon: "👗",
    description: "Explore fashionable women's wear.",
    value: "women's clothing",
  },
];

function Categories() {
  return (
    <div className="categories-page">

      <div className="categories-heading">
        <span>OUR COLLECTION</span>
        <h1>Explore Categories</h1>
        <p>Find everything you love in one place.</p>
      </div>

      <div className="categories-grid">

        {categories.map((category) => (
          <Link
            to={`/products?category=${encodeURIComponent(category.value)}`}
            className="category-card"
            key={category.value}
          >
            <div className="category-icon">
              {category.icon}
            </div>

            <h2>{category.name}</h2>

            <p>{category.description}</p>

            <span className="category-link">
              Explore Collection →
            </span>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Categories;