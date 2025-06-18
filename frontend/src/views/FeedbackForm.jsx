import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import "../modules/FeedbackForm.css";

export default function UserForm() {
    const { orderId, id } = useParams();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        id: '',
        rate: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/feedbacks/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setFeedback(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        // Validate rate (must be between 1 and 10)
        if (feedback.rate < 1 || feedback.rate > 10) {
            setErrors({ rate: ["Rate must be between 1 and 10."] });
            return;
        }

        setLoading(true); // Enable loading for create/update

        // Include orderId in the payload if it exists
        const payload = orderId ? { ...feedback, order_id: orderId } : feedback;

        const request = feedback.id
            ? axiosClient.put(`/feedbacks/${feedback.id}`, payload)
            : axiosClient.post('/feedbacks', payload);

        request
            .then(() => {
                navigate('/customer/orders');
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
            .finally(() => {
                setLoading(false); // Disable loading after request completes
            });
    };

    return (
        <div className="user-form-container">
            {feedback.id && <h1 className="form-title">Update Feedback on: {feedback.order.device_name}</h1>}
            {!feedback.id && <h1 className="form-title">New Feedback</h1>}

            <div className="form-card">
                {loading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <span>Loading...</span>
                    </div>
                )}

                {errors && (
                    <div className="error-alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit} className="feedback-form">
                        <input
                            type="number"
                            value={feedback.rate}
                            onChange={(ev) => setFeedback({ ...feedback, rate: ev.target.value })}
                            placeholder="Rate from 1 to 10"
                            min="1"
                            max="10"
                            className="form-input"
                        />
                        <textarea
                            value={feedback.description}
                            onChange={(ev) => setFeedback({ ...feedback, description: ev.target.value })}
                            placeholder="Description"
                            rows="5"
                            className="form-textarea"
                        />
                        <button type="submit" className="submit-button">
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
