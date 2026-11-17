import React from "react";
import { Link } from "react-router-dom";

import {
  Star,
  ShoppingCart,
  Heart
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

import "./ProductCard.css";

function ProductCard({ product }) {

  const {
    isWishlisted,
    toggleWishlist
  } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">

      {/* Product Image */}

      <div className="product-image">

        <img
          src={product.image}
          alt={product.title}
        />

        {/* Wishlist Button */}

        <button
          type="button"
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
          title={
            wishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
          aria-label="Toggle Wishlist"
        >

          <Heart
            size={20}
            fill={wishlisted ? "currentColor" : "none"}
          />

        </button>

      </div>

      {/* Product Information */}

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3 title={product.title}>
          {product.title}
        </h3>

        {/* Rating */}

        <div className="product-rating">

          <Star
            size={16}
            fill="#f5a623"
            color="#f5a623"
          />

          <span>
            {product.rating?.rate || "N/A"}
          </span>

          <span className="rating-count">
            ({product.rating?.count || 0} reviews)
          </span>

        </div>

        {/* Price and View Button */}

        <div className="product-bottom">

          <h4>
            ${Number(product.price).toFixed(2)}
          </h4>

          <Link
            to={`/products/${product.id}`}
            className="view-product"
          >

            <ShoppingCart size={17} />
            View

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;