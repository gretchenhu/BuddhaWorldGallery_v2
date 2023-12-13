import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "../components/Login";
import "./Admin.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./Admin.css";

const AdminPage = () => {
  const { user } = useContext(UserContext);

  const handleSuccessfulLogin = () => {
    // Redirect to the admin page
    window.location.href = "/admin";
  };

  return (
    <div className="admin-page-container">
      <Navbar />
      <div className="admin-content-container">
        {user && user.role === "admin" ? (
          // If already logged in as admin, show admin content
          <div>Admin Content or Redirect</div>
        ) : (
          // If not logged in as admin, show the login form with isAdminLogin
          <Login
            onSuccessfulLogin={handleSuccessfulLogin}
            isAdminLogin={true}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
