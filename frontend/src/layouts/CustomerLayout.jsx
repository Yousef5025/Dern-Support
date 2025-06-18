import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="logo">Dern-Support</div>
                    <nav>
                        <Link to="/customer/home">Home</Link>
                        <Link to="/customer/orders">My Orders</Link>
                        <Link to="/customer/Feedbacks">Feedbacks</Link>
                        <Link to="#">Contact Us</Link>
                        <Link to="" onClick={onLogout} className="btn-logout">
                            {" "}
                            Logout
                        </Link>
                    </nav>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
