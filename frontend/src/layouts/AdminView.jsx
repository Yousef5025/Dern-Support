import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom';


function AdminView() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const onDeleteClick = (order) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/orders/${order.id}`).then(() => {
            getOrders();
        });
    };

    const getOrders = () => {
        setLoading(true);
        axiosClient
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
      <div className="container mt-4">
            <h1 className="mb-4">Orders</h1>

            {/* Search and Filter Section */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search orders..."
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-select">
                        <option value="">Filter by status</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary w-100">
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>device name</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.device_name}</td>
                                    <td>{o.user.name}</td>
                                    <td>{o.created_at}</td>
                                    <td>{o.statues}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/orders/" + o.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick(o)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default AdminView;
