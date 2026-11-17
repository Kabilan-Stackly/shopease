import React, { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAdmin } from "../context/AdminContext";

import { ArrowLeft, Save } from "lucide-react";

import "./Admin.css";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { products, dispatch, loading } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const product = products.find(
    (item) => String(item.id) === id
  );

  useEffect(() => {

    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
      });
    }

  }, [product]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (!product) {
    return (
      <div className="admin-form-page">
        <h2>Product Not Found</h2>

        <Link to="/admin/products">
          Back to Products
        </Link>
      </div>
    );
  }

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
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    try {
      const imageUrl = new URL(formData.image);

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        newErrors.image = "Enter a valid image URL";
      }
    } catch {
      newErrors.image = "Enter a valid image URL";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const updatedProduct = {
      ...product,
      ...formData,
      price: Number(formData.price),
    };

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: updatedProduct,
    });

    alert("Product updated successfully!");

    navigate("/admin/products");
  };

  return (
    <div className="admin-form-page">

      <Link to="/admin/products" className="admin-back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="admin-page-title">
        <h1>Edit Product</h1>
        <p>Update your product information.</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="title"
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
          <label>Description</label>

          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />

          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          {errors.image && (
            <span className="form-error">{errors.image}</span>
          )}
        </div>

        <button type="submit" className="save-product-btn">
          <Save size={18} />
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;