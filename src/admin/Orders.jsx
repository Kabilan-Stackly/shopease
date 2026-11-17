import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

import "./Admin.css";

const ordersData = [
  {
    id: "#ORD001",
    customer: "Arun Kumar",
    email: "arun@gmail.com",
    date: "2026-11-10",
    amount: 249.99,
    status: "Delivered",
    items: 2,
  },
  {
    id: "#ORD002",
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    date: "2026-11-11",
    amount: 149.50,
    status: "Pending",
    items: 1,
  },
  {
    id: "#ORD003",
    customer: "Priya Devi",
    email: "priya@gmail.com",
    date: "2026-11-12",
    amount: 399.99,
    status: "Shipped",
    items: 3,
  },
  {
    id: "#ORD004",
    customer: "Karthik Raj",
    email: "karthik@gmail.com",
    date: "2026-11-12",
    amount: 89.99,
    status: "Delivered",
    items: 1,
  },
  {
    id: "#ORD005",
    customer: "Sneha R",
    email: "sneha@gmail.com",
    date: "2026-11-13",
    amount: 199.99,
    status: "Pending",
    items: 2,
  },
  {
    id: "#ORD006",
    customer: "Vijay Kumar",
    email: "vijay@gmail.com",
    date: "2026-11-13",
    amount: 299.99,
    status: "Shipped",
    items: 4,
  },
];

function Orders() {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchRef = useRef(null);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "All";

  const updateSearch = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const updateStatus = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "All") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    setSearchParams(params);
  };

  const filteredOrders = ordersData.filter((order) => {

    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  const delivered = ordersData.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pending = ordersData.filter(
    (order) => order.status === "Pending"
  ).length;

  const shipped = ordersData.filter(
    (order) => order.status === "Shipped"
  ).length;

  const getStatusClass = (value) => {
    return value.toLowerCase();
  };

  return (
    <div className="orders-page">

      <div className="admin-page-title">
        <h1>Orders Management</h1>
        <p>Track and manage your customer orders.</p>
      </div>

      {/* Statistics */}

      <div className="order-stats">

        <div className="order-stat-card">
          <ShoppingBag />
          <p>Total Orders</p>
          <h2>{ordersData.length}</h2>
        </div>

        <div className="order-stat-card">
          <CheckCircle />
          <p>Delivered</p>
          <h2>{delivered}</h2>
        </div>

        <div className="order-stat-card">
          <Clock />
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>

        <div className="order-stat-card">
          <Truck />
          <p>Shipped</p>
          <h2>{shipped}</h2>
        </div>

      </div>

      {/* Search and Filter */}

      <div className="orders-toolbar">

        <div className="orders-search">

          <Search size={19} />

          <input
            ref={searchRef}
            type="text"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />

          <button
            type="button"
            onClick={() => searchRef.current?.focus()}
          >
            Focus
          </button>

        </div>

        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

      </div>

      {/* Orders Table */}

      <div className="admin-table-container">

        <table className="admin-table orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((order) => (

                <tr key={order.id}>

                  <td className="order-id">
                    {order.id}
                  </td>

                  <td>
                    <div className="customer-info">
                      <strong>{order.customer}</strong>
                      <span>{order.email}</span>
                    </div>
                  </td>

                  <td>{order.date}</td>

                  <td>{order.items}</td>

                  <td className="admin-price">
                    ${order.amount.toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={`order-status ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="no-products">
                  No orders found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      <p className="product-count">
        Showing {filteredOrders.length} of {ordersData.length} orders
      </p>

    </div>
  );
}

export default Orders;