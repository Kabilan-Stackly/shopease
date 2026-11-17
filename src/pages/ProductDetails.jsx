import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";

import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

import { addToCart } from "../redux/cartSlice";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    data: product,
    loading,
    error,
  } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <Loader />;
  }

  if (error || !product?.id) {
    return (
      <div className="details-error">
        <h2>Product Not Found</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    alert("Product added to cart successfully!");
  };

  return (
    <div className="product-details-page">

      <Link to="/products" className="back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="product-details-container">

        {/* Product Image */}

        <div className="details-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* Product Information */}

        <div className="details-content">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="details-rating">

            <Star
              size={19}
              fill="#f5a623"
              color="#f5a623"
            />

            <strong>
              {product.rating?.rate}
            </strong>

            <span>
              ({product.rating?.count} reviews)
            </span>

          </div>

          <h2 className="details-price">
            ${Number(product.price).toFixed(2)}
          </h2>

          <div className="details-divider"></div>

          <h3>Product Description</h3>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-divider"></div>

          {/* Quantity Selector */}

          <h3>Quantity</h3>

          <div className="quantity-selector">

            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              <Minus size={16} />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity((q) => q + 1)
              }
            >
              <Plus size={16} />
            </button>

          </div>

          {/* Add to Cart */}

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={19} />
            Add to Cart
          </button>

          <div className="product-benefits">
            <p>✓ Quality products</p>
            <p>✓ Secure shopping experience</p>
            <p>✓ Customer support available</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;