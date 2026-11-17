import React, { useReducer } from "react";
import { Plus, Minus, RotateCcw, ShoppingBag } from "lucide-react";

import "./ReducerDemo.css";

// Initial state
const initialState = {
    quantity: 1,
};

// Reducer function
function quantityReducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                quantity: state.quantity + 1,
            };

        case "DECREMENT":
            return {
                ...state,
                quantity: Math.max(1, state.quantity - 1),
            };

        case "RESET":
            return initialState;

        default:
            return state;
    }
}

function ReducerDemo() {
    const [state, dispatch] = useReducer(
        quantityReducer,
        initialState
    );

    return (
        <div className="reducer-page">

            <div className="reducer-card">

                <div className="reducer-icon">
                    <ShoppingBag size={35} />
                </div>

                <span className="reducer-label">
                    REACT HOOK DEMONSTRATION
                </span>

                <h1>Product Quantity Manager</h1>

                <p className="reducer-description">
                    Manage product quantity using the useReducer hook.
                </p>

                <div className="quantity-display">
                    <span>Selected Quantity</span>

                    <h2>{state.quantity}</h2>
                </div>

                <div className="reducer-buttons">

                    <button
                        onClick={() => dispatch({ type: "DECREMENT" })}
                        disabled={state.quantity === 1}
                    >
                        <Minus size={18} />
                        Decrease
                    </button>

                    <button
                        onClick={() => dispatch({ type: "INCREMENT" })}
                    >
                        <Plus size={18} />
                        Increase
                    </button>

                </div>

                <button
                    className="reset-button"
                    onClick={() => dispatch({ type: "RESET" })}
                >
                    <RotateCcw size={17} />
                    Reset Quantity
                </button>

                <div className="reducer-info">
                    <p>Hook Used: <strong>useReducer</strong></p>
                    <p>Current State: <strong>{state.quantity}</strong></p>
                    <p>Minimum Quantity: <strong>1</strong></p>
                </div>

            </div>

        </div>
    );
}

export default ReducerDemo;