import React from "react";
import { Package, ShoppingBag, DollarSign, Users } from "lucide-react";

import { useAdmin } from "../context/AdminContext";
import "./Admin.css";

function Dashboard() {
  const { products, loading } = useAdmin();

  const stats = [
    {
      title: "Total Products",
      value: loading ? "..." : products.length,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: "128",
      icon: ShoppingBag,
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
    },
    {
      title: "Customers",
      value: "856",
      icon: Users,
    },
  ];

  return (
    <div className="dashboard">

      <div className="admin-page-title">
        <h1>Dashboard Overview</h1>
        <p>Welcome to your ShopEase administration panel.</p>
      </div>

      <div className="stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-icon">
                <Icon size={25} />
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          );
        })}

      </div>

      <div className="admin-welcome">
        <h2>Welcome to ShopEase Admin!</h2>
        <p>
          Manage your products, monitor your store and
          organize your shopping experience from one place.
        </p>
      </div>

      <div className="recent-products">
        <h2>Recent Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.slice(0, 5).map((product) => (
            <div className="recent-product" key={product.id}>
              <img src={product.image} alt={product.title} />

              <div>
                <h4>{product.title}</h4>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;