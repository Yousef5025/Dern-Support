import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import "../modules/OrderForm.css";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id: '',
        device_name: '',
        statues: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/orders/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setOrder(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const request = order.id
            ? axiosClient.put(`/orders/${order.id}`, order)
            : axiosClient.post('/orders', order);

        request
            .then(() => {
                navigate('/customer/orders');
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="user-form-container">
            {order.id && <h1 className="form-title">Update Order: {order.device_name}</h1>}
            {!order.id && <h1 className="form-title">New Order</h1>}

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
                    <form onSubmit={onSubmit} className="order-form">
                        <input
                            type="text"
                            value={order.device_name}
                            onChange={(ev) => setOrder({ ...order, device_name: ev.target.value })}
                            placeholder="Device Name"
                            className="form-input"
                        />
                        {order.id && (
                            <input
                                type="text"
                                value={order.statues}
                                onChange={(ev) => setOrder({ ...order, statues: ev.target.value })}
                                placeholder="Status"
                                className="form-input"
                            />
                        )}
                        <textarea
                            value={order.description}
                            onChange={(ev) => setOrder({ ...order, description: ev.target.value })}
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
