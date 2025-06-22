import React from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

function LandingPage() {

  const {user, token, setUser, setToken} = useStateContext();
  if(!token){
    return <Navigate to='/login'/>
  }


  useEffect(() => {
      axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])

  return (
    <div className="App">

      {/* Main Section */}
      <section className="main-section">
        <div className="main-content">
          <h1>Hello {user.name} To</h1>
          <h1>Your Trusted IT Support Partner</h1>
          <p>Fast, reliable, and professional IT solutions for businesses and individuals.</p>
          <Link to='/customer/orders/new' className="cta-button">Add Request</Link>
        </div>
      </section>

      {/* Feedbacks Section */}
      <section className="feedbacks-section">
        <h2>What Our Customers Say</h2>
        <div className="feedback-cards">
          <div className="card">
            <img src="/customers/1.jpg" alt="Customer 1" />
            <h3>John Doe</h3>
            <p>"Great service! Fast and reliable."</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="card">
            <img src="/customers/2.jpg" alt="Customer 2" />
            <h3>Jane Smith</h3>
            <p>"Highly recommend Dern-Support!"</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="card">
            <img src="/customers/3.jpg" alt="Customer 3" />
            <h3>Mike Johnson</h3>
            <p>"Excellent support team!"</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Dern-Support</h2>
        <p>Dern-Support has been providing IT solutions since 2010, offering fast and reliable support for businesses and individuals. Our team of expert technicians is dedicated to solving your IT problems efficiently.</p>
        <img src="/team.jpg" alt="Dern-Support Team" />
      </section>

      {/* Footer */}
      <footer>
        <div className="contact-info">
          <p>Call us: +123 456 7890</p>
        </div>
        <div className="social-media">
          <a href="#"><img src="/images/facebook-icon.png" alt="Facebook" /></a>
          <a href="#"><img src="/images/twitter-icon.png" alt="Twitter" /></a>
          <a href="#"><img src="/images/instagram-icon.png" alt="Instagram" /></a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
