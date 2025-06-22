import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function CustomerView() {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useStateContext();

  // Fetch feedbacks
  useEffect(() => {
    axiosClient.get('/feedbacks')
      .then(({ data }) => {
        setFeedbacks(data.data); // Assuming the API returns { data: [...] }
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);

  // Check if feedback exists for a given order
  const fetchFeedback = (orderId) => {
    return feedbacks.find((feedback) => feedback.order_id === orderId);
  };

  // Fetch user data
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  // Fetch orders
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setLoading(true);
    axiosClient
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data.data); // Assuming the API returns { data: [...] }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching orders:", error);
      });
  };

  // Handle order deletion
  const onDeleteClick = (order) => {
    if (!window.confirm("Are you sure you want to cancel this Order?")) {
      return;
    }
    axiosClient
      .delete(`/orders/${order.id}`)
      .then(() => {
        getOrders(); // Refresh the orders list
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <div className="customer-view">
      <h1 className="page-title">Orders</h1>

      {/* Filters and Actions */}
      <div className="filters-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search orders..."
        />
        <select className="filter-select">
          <option value="">Filter by status</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="apply-filters-button">
          Apply Filters
        </button>
        <Link to="/orders/new" className="create-order-button">
          Create Order
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-message">
          Loading...
        </div>
      )}

      {/* Orders Grid */}
      {!loading && (
        <div className="orders-grid">
          {orders.map((o) => {
            const feedback = fetchFeedback(o.id); // Check if feedback exists for this order
            return (
              <div className="order-card" key={o.id}>
                <h3 className="order-title">{o.device_name}</h3>
                <p className="order-description">{o.description}</p>
                <div className="order-actions">
                  <button className="status-button">
                    {o.statues}
                  </button>
                  {feedback ? (
                    <Link to={`/feedbacks/${o.id}/${feedback.id}`} className="feedback-button">
                      Edit Feedback
                    </Link>
                  ) : (
                    <Link to={`/feedbacks/new/${o.id}`} className="feedback-button">
                      Add Feedback
                    </Link>
                  )}
                  <button
                    onClick={() => onDeleteClick(o)}
                    className="btn btn-danger"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
