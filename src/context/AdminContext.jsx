import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import axios from "axios";

const AdminContext = createContext();

const initialState = {
  products: [],
  loading: true,
};

function adminReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? action.payload
            : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(
    adminReducer,
    initialState
  );

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: "SET_PRODUCTS",
          payload: [],
        });
      });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}