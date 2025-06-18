import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient.js";

export default function TechnicalForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [technical, settechnical] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Fetch technical data if editing
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/technicals/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    settechnical(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    // Handle form submission
    const onSubmit = (ev) => {
        ev.preventDefault();

        if (technical.id) {
            // Update technical
            axiosClient
                .put(`/technicals/${technical.id}`, technical)
                .then(() => {
                    navigate("/admin/technicals");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            // Create new technical
            axiosClient
                .post("/technicals", technical)
                .then(() => {
                    navigate("/admin/technicals");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {technical.id && <h1>Update technical: {technical.name}</h1>}
            {!technical.id && <h1>New technical</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={technical.name}
                            onChange={(ev) =>
                                settechnical({ ...technical, name: ev.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={technical.email}
                            onChange={(ev) =>
                                settechnical({ ...technical, email: ev.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            value={technical.password}
                            onChange={(ev) =>
                                settechnical({ ...technical, password: ev.target.value })
                            }
                            placeholder="password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}