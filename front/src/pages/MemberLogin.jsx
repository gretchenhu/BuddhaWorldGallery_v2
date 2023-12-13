// MemberLogin.jsx
import React from "react";
import Login from "../components/Login";
import "./MemberLogin.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MemberLogin = () => {
  const handleSuccessfulLogin = () => {
    // Redirect to the home page cus root path
    window.location.href = "/";
  };

  return (
    <div className="member-login-container">
      <section className="navbar-section">
        <Navbar />
      </section>
      <section className="login-section">
        <Login onSuccessfulLogin={handleSuccessfulLogin} />
      </section>
      <section className="footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default MemberLogin;
