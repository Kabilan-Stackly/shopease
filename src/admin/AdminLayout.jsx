import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Store,
} from "lucide-react";

import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <Link to="/" className="admin-logo">
          Shop<span>Ease</span>.
        </Link>

        <p className="sidebar-label">ADMIN MENU</p>

        <nav className="sidebar-nav">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products">
            <Package size={19} />
            Manage Products
          </NavLink>

          <NavLink to="/admin/add-product">
            <PlusCircle size={19} />
            Add Product
          </NavLink>

          <NavLink to="/admin/orders">
            <ShoppingBag size={19} />
            Orders
          </NavLink>

        </nav>

        <Link to="/" className="back-store">
          <Store size={18} />
          Back to Store
        </Link>

      </aside>

      <main className="admin-main">

        <header className="admin-header">
          <h2>Admin Panel</h2>
          <span>Administrator</span>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;