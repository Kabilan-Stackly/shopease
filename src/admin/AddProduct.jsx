import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAdmin } from "../context/AdminContext";

import { ArrowLeft, Save } from "lucide-react";

import "./Admin.css";

function AddProduct() {

  const { dispatch } = useAdmin();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product name is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else {
      try {
        const imageUrl = new URL(formData.image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          newErrors.image = "Enter a valid image URL";
        }
      } catch {
        newErrors.image = "Enter a valid image URL";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      rating: {
        rate: 0,
        count: 0,
      },
    };

    dispatch({
      type: "ADD_PRODUCT",
      payload: newProduct,
    });

    alert("Product added successfully!");

    navigate("/admin/products");
  };

  return (
    <div className="admin-form-page">

      <Link to="/admin/products" className="admin-back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="admin-page-title">
        <h1>Add New Product</h1>
        <p>Enter the product information below.</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="title"
            placeholder="Enter product name"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <span className="form-error">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label>Price ($)</label>

          <input
            type="number"
            name="price"
            min="0.01"
            step="0.01"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
          />

          {errors.price && (
            <span className="form-error">{errors.price}</span>
          )}
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          {errors.category && (
            <span className="form-error">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label>Product Description</label>

          <textarea
            name="description"
            rows="5"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
          />

          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label>Product Image URL</label>

          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={handleChange}
          />

          {errors.image && (
            <span className="form-error">{errors.image}</span>
          )}
        </div>

        {formData.image && (
          <div className="image-preview">
            <p>Image Preview</p>
            <img
              src={formData.image}
              alt="Product preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onLoad={(e) => {
                e.currentTarget.style.display = "block";
              }}
            />
          </div>
        )}

        <button type="submit" className="save-product-btn">
          <Save size={18} />
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;