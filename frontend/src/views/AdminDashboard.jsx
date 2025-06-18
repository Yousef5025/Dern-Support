import { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import '../modules/AdminDashboard.css'



export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState({
    orders: true,
    feedbacks: true
  });
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    axiosClient.get('/orders')
      .then(({ data }) => {
        setOrders(data.data);
        setLoading(prev => ({ ...prev, orders: false }));
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(prev => ({ ...prev, orders: false }));
      });

    axiosClient.get('/feedbacks')
      .then(({ data }) => {
        setFeedbacks(data.data);
        setLoading(prev => ({ ...prev, feedbacks: false }));
      })
      .catch(err => {
        console.error('Error fetching feedbacks:', err);
        setLoading(prev => ({ ...prev, feedbacks: false }));
      });
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      in_progress: 'status-in-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    const statusText = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return (
      <span className={`status-badge ${statusClasses[status] || 'status-default'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= Math.round(rating/2) ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders ({orders.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'feedbacks' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedbacks')}
        >
          Feedbacks ({feedbacks.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="dashboard-card">
          {loading.orders ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading orders...</p>
            </div>
          ) : (
            <>
              {orders.length === 0 ? (
                <div className="empty-state">No orders found</div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Device</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>
                            <div className="device-name">{order.device_name}</div>
                            <div className="device-desc">{order.description.substring(0, 30)}...</div>
                          </td>
                          <td>{order.user?.name || 'N/A'}</td>
                          <td>{getStatusBadge(order.statues)}</td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Feedbacks Tab */}
      {activeTab === 'feedbacks' && (
        <div className="dashboard-card">
          {loading.feedbacks ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading feedbacks...</p>
            </div>
          ) : (
            <>
              {feedbacks.length === 0 ? (
                <div className="empty-state">No feedbacks found</div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Technician</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map(feedback => (
                        <tr key={feedback.id}>
                          <td>#{feedback.order_id}</td>
                          <td>{feedback.technician?.name || 'N/A'}</td>
                          <td>{getRatingStars(feedback.rate)}</td>
                          <td className="feedback-text">{feedback.description}</td>
                          <td>{new Date(feedback.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-value">
            {orders.filter(o => o.statues === 'pendding').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Avg. Rating</h3>
          <p className="stat-value">
            {feedbacks.length > 0 
              ? (feedbacks.reduce((a, b) => a + b.rate, 0) / feedbacks.length).toFixed(1)
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}