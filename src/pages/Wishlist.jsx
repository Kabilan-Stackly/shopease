import React from "react";

import {
  Heart,
  ShoppingBag,
  Trash2
} from "lucide-react";

import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

import ProductCard from "../components/ProductCard";

import "./Wishlist.css";

function Wishlist() {

  const {
    wishlist,
    clearWishlist
  } = useWishlist();

  return (

    <div className="wishlist-page">

      {/* Header */}

      <div className="wishlist-header">

        <Heart
          size={35}
          color="#7456f1"
        />

        <h1>My Wishlist</h1>

        <p>
          Save your favourite products and shop them anytime.
        </p>

      </div>

      {/* Wishlist Information */}

      <div className="wishlist-toolbar">

        <h3>
          My Favourite Products ({wishlist.length})
        </h3>

        {wishlist.length > 0 && (

          <button
            className="clear-wishlist"
            onClick={clearWishlist}
          >
            <Trash2 size={16} />
            Clear Wishlist
          </button>

        )}

      </div>

      {/* Wishlist Products */}

      {wishlist.length > 0 ? (

        <div className="wishlist-grid">

          {wishlist.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      ) : (

        /* Empty Wishlist */

        <div className="empty-wishlist">

          <div className="empty-icon">
            <ShoppingBag size={45} />
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            You haven't added any products to your wishlist yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Explore Products
          </Link>

        </div>

      )}

    </div>

  );
}

export default Wishlist;