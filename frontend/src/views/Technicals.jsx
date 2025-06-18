import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import '../modules/technicals.css'


export default function Technicals() {
    const [technicals, setTechnicals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTechnicals();
    }, []);

    const onDeleteClick = (technical) => {
        if (!window.confirm("Are you sure you want to delete this technician?")) {
            return;
        }
        axiosClient
            .delete(`/technicals/${technical.id}`)
            .then(() => {
                getTechnicals();
            })
            .catch((error) => {
                console.error("Error deleting technician:", error);
            });
    };

    const getTechnicals = () => {
        setLoading(true);
        axiosClient
            .get("/technicals")
            .then(({ data }) => {
                setLoading(false);
                setTechnicals(data.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching technicians:", error);
            });
    };

    return (
        <div className="technicals-container">
            <div className="technicals-header">
                <h2>Technicians Management</h2>
                <Link to="/admin/technicals/new" className="add-technician-btn">
                    + New Technician
                </Link>
            </div>

            <div className="technicals-table-container">
                {loading ? (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <span>Loading technicians...</span>
                    </div>
                ) : (
                    <table className="technicals-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicals.map((tech) => (
                                <tr key={tech.id}>
                                    <td>{tech.id}</td>
                                    <td>{tech.name}</td>
                                    <td>{tech.email}</td>
                                    <td className="actions">
                                        <Link to={`/admin/technicals/${tech.id}`} className="edit-btn">
                                            Edit
                                        </Link>
                                        <button onClick={() => onDeleteClick(tech)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}