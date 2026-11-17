import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";

import "./Cart.css";

function Cart() {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Empty Cart

  if (cartItems.length === 0) {

    return (
      <div className="empty-cart">

        <ShoppingBag size={65} />

        <h2>Your Cart is Empty</h2>

        <p>
          Discover something you love and add it to your cart.
        </p>

        <Link
          to="/products"
          className="continue-shopping"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (

    <div className="cart-page">

      <div className="cart-header">

        <h1>Shopping Cart</h1>

        <p>{totalItems} items in your cart</p>

      </div>

      <div className="cart-layout">

        {/* Cart Items */}

        <div className="cart-items">

          {cartItems.map((item) => (

            <div className="cart-item" key={item.id}>

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="cart-item-info">

                <h3>{item.title}</h3>

                <p>
                  ${Number(item.price).toFixed(2)}
                </p>

                {/* Quantity */}

                <div className="cart-quantity">

                  <button
                    disabled={item.quantity === 1}
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Plus size={15} />
                  </button>

                </div>

              </div>

              {/* Price and Remove */}

              <div className="cart-item-actions">

                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                  className="remove-item"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          ))}

          <button
            className="clear-cart"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

        </div>

        {/* Order Summary */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>

          </div> 

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            to="/products"
            className="continue-link"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;