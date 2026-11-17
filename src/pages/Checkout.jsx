import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { clearCart } from "../redux/cartSlice";

import {
    ShoppingBag,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";

import "./Checkout.css";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Handle input changes
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

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Enter a valid 6-digit PIN code";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Place order
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (cartItems.length === 0) {
            return;
        }

        setOrderPlaced(true);

        // Clear cart after successful demo order
        dispatch(clearCart());
    };

    // Empty cart
    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-empty">
                <ShoppingBag size={60} />

                <h2>Your Cart is Empty</h2>

                <p>Add products before proceeding to checkout.</p>

                <Link to="/products">
                    Explore Products
                </Link>
            </div>
        );
    }

    // Order confirmation
    if (orderPlaced) {
        return (
            <div className="order-success">

                <CheckCircle size={75} />

                <h1>Order Placed Successfully!</h1>

                <p>
                    Thank you, {formData.name}.
                    Your demo order has been confirmed.
                </p>

                <Link to="/products">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="checkout-page">

            <div className="checkout-header">
                <Link to="/cart" className="back-to-cart">
                    <ArrowLeft size={18} />
                    Back to Cart
                </Link>

                <h1>Checkout</h1>

                <p>Complete your details to place your order.</p>
            </div>

            <div className="checkout-layout">

                {/* Customer Details */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Delivery Information</h2>

                    <div className="form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <span className="form-error">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <span className="form-error">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            maxLength="10"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        {errors.phone && (
                            <span className="form-error">
                                {errors.phone}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>

                        <textarea
                            name="address"
                            placeholder="Enter your full address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        {errors.address && (
                            <span className="form-error">
                                {errors.address}
                            </span>
                        )}
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            {errors.city && (
                                <span className="form-error">
                                    {errors.city}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>PIN Code</label>

                            <input
                                type="text"
                                name="pincode"
                                placeholder="6-digit PIN"
                                maxLength="6"
                                value={formData.pincode}
                                onChange={handleChange}
                            />

                            {errors.pincode && (
                                <span className="form-error">
                                    {errors.pincode}
                                </span>
                            )}
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="place-order-btn"
                    >
                        Place Order - ${totalPrice.toFixed(2)}
                    </button>

                </form>

                {/* Order Summary */}

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (
                        <div
                            className="checkout-product"
                            key={item.id}
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                            />

                            <div className="checkout-product-info">
                                <h4>{item.title}</h4>

                                <p>
                                    Quantity: {item.quantity}
                                </p>
                            </div>

                            <strong>
                                ${(item.price * item.quantity).toFixed(2)}
                            </strong>

                        </div>
                    ))}

                    <div className="checkout-total">
                        <span>Subtotal</span>

                        <strong>
                            ${totalPrice.toFixed(2)}
                        </strong>
                    </div>

                    <div className="checkout-total">
                        <span>Shipping</span>

                        <strong>Free</strong>
                    </div>

                    <div className="checkout-grand-total">
                        <span>Total</span>

                        <strong>
                            ${totalPrice.toFixed(2)}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;