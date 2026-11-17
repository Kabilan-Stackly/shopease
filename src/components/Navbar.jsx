import { useState } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  Search,
  ShoppingCart,
  UserRound,
  Headset,
  Menu,
  X,
  Heart
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  // Redux Cart

  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Wishlist Context

  const { wishlist } = useWishlist();

  const wishlistCount = wishlist.length;

  // Close Mobile Menu

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        Shop<span>Ease</span>.
      </Link>

      {/* NAVIGATION LINKS */}

      <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/products" onClick={closeMenu}>
          Products
        </Link>

        <Link to="/categories" onClick={closeMenu}>
          Categories
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

      </div>

      {/* NAVBAR ICONS */}

      <div className="nav-actions">

        {/* SEARCH */}

        <Link
          to="/products"
          title="Search Products"
          onClick={closeMenu}
        >
          <Search size={21} />
        </Link>

        {/* CART */}

        <Link
          to="/cart"
          title="Shopping Cart"
          className="cart-icon"
          onClick={closeMenu}
        >

          <ShoppingCart size={21} />

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>

        {/* WISHLIST */}

        <Link
          to="/wishlist"
          title="My Wishlist"
          className="wishlist-nav"
          onClick={closeMenu}
        >

          <Heart size={21} />

          {wishlistCount > 0 && (
            <span className="wishlist-badge">
              {wishlistCount}
            </span>
          )}

        </Link>

        {/* CONTACT */}

        <Link
          to="/contact"
          title="Contact Support"
          onClick={closeMenu}
        >
          <Headset size={21} />
        </Link>

        {/* PROFILE */}

        <Link
          to="/profile"
          title="My Profile"
          onClick={closeMenu}
        >
          <UserRound size={21} />
        </Link>

        {/* MOBILE MENU */}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >

          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}

        </button>

      </div>

    </nav>

  );
}

export default Navbar;