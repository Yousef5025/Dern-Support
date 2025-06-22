import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useStateContext();

  // Fetch feedbacks
  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = () => {
    setLoading(true);
    axiosClient
      .get("/feedbacks")
      .then(({ data }) => {
        setLoading(false);
        setFeedbacks(data.data); // Assuming the API returns { data: [...] }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching feedbacks:", error);
      });
  };

  // Handle feedback deletion
  const onDeleteClick = (feedback) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
    axiosClient
      .delete(`/feedbacks/${feedback.id}`)
      .then(() => {
        getFeedbacks(); // Refresh the feedbacks list
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });
  };

  return (
    <div className="feedbacks-page">
      <h1 className="page-title">Feedbacks</h1>

      {/* Filters and Actions */}
      <div className="filters-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search feedbacks..."
        />
        <select className="filter-select">
          <option value="">Filter by rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button className="apply-filters-button">
          Apply Filters
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-message">
          Loading...
        </div>
      )}

      {/* Feedbacks Grid */}
      {!loading && (
        <div className="feedbacks-grid">
          {feedbacks.map((feedback) => (
            <div className="feedback-card" key={feedback.id}>
              <h3 className="feedback-title">Order ID: {feedback.order_id}</h3>
              <p className="feedback-description">{feedback.description}</p>
              <div className="feedback-rating">
                Rating: {feedback.rate} / 10
              </div>
              <div className="feedback-actions">
                <Link
                  to={`/feedbacks/edit/${feedback.id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeleteClick(feedback)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
