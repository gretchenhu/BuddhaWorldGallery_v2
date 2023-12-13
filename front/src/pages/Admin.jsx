import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext
import Login from '../components/Login';
import "./Admin.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AdminPage = () => {
  const { user } = useContext(UserContext); // Use user context

  const handleSuccessfulLogin = () => {
    // Redirect to the admin page 
    window.location.href = "/admin"; 
  };

  return (
    <div>
      <Navbar />
      {user && user.role === "admin" ? (
        // If already logged in as admin, show admin content
        <div>Admin Content or Redirect</div>
      ) : (
        // If not logged in as admin, show the login form with isAdminLogin
        <Login onSuccessfulLogin={handleSuccessfulLogin} isAdminLogin={true} />
      )}
      <Footer/>
    </div>
  );
};

export default AdminPage;
