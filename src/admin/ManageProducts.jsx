import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
} from "lucide-react";

import "./Admin.css";

function ManageProducts() {
  const { products, loading, dispatch } = useAdmin();

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      dispatch({
        type: "DELETE_PRODUCT",
        payload: id,
      });
    }
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div className="manage-products">

      <div className="admin-page-title">
        <h1>Manage Products</h1>
        <p>View, search, edit and manage your store products.</p>
      </div>

      {/* Toolbar */}

      <div className="products-toolbar">

        <div className="admin-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link to="/admin/add-product" className="add-product-btn">
          <Plus size={19} />
          Add Product
        </Link>

      </div>

      {/* Products Table */}

      <div className="admin-table-container">

        <table className="admin-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <tr key={product.id}>

                  <td>
                    <div className="admin-product-info">

                      <img
                        src={product.image}
                        alt={product.title}
                      />

                      <span>{product.title}</span>

                    </div>
                  </td>

                  <td>{product.category}</td>

                  <td className="admin-price">
                    ${Number(product.price).toFixed(2)}
                  </td>

                  <td>
                    ⭐ {product.rating?.rate || "New"}
                  </td>

                  <td>
                    <div className="admin-actions">

                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="edit-btn"
                        title="Edit Product"
                      >
                        <Edit size={17} />
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.id)}
                        title="Delete Product"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="5" className="no-products">
                  <Package size={35} />
                  <p>No products found.</p>
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      <p className="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

    </div>
  );
}

export default ManageProducts;