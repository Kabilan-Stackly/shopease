import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Customer Components
import Navbar from "./components/Navbar";
import ReducerDemo from "./components/ReducerDemo";

// Customer Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

// Context
import { AdminProvider } from "./context/AdminContext";
import { WishlistProvider } from "./context/WishlistContext";

// Admin Components
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";

// Styles
import "./App.css";

function App() {
  return (
    <AdminProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>

            {/* CUSTOMER PAGES */}

            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />

            <Route
              path="/products"
              element={
                <>
                  <Navbar />
                  <Products />
                </>
              }
            />

            <Route
              path="/products/:id"
              element={
                <>
                  <Navbar />
                  <ProductDetails />
                </>
              }
            />

            <Route
              path="/categories"
              element={
                <>
                  <Navbar />
                  <Categories />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <About />
                </>
              }
            />

            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                </>
              }
            />

            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <Cart />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <Profile />
                </>
              }
            />

            <Route
              path="/reducer-demo"
              element={
                <>
                  <Navbar />
                  <ReducerDemo />
                </>
              }
            />

            {/* WISHLIST PAGE */}

            <Route
              path="/wishlist"
              element={
                <>
                  <Navbar />
                  <Wishlist />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <Checkout />
                </>
              }
            />

            {/* ADMIN PAGES */}

            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<Dashboard />}
              />

              <Route
                path="products"
                element={<ManageProducts />}
              />

              <Route
                path="add-product"
                element={<AddProduct />}
              />

              <Route
                path="edit-product/:id"
                element={<EditProduct />}
              />

              <Route
                path="orders"
                element={<Orders />}
              />
            </Route>

            {/* PAGE NOT FOUND */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </AdminProvider>
  );
}

export default App;