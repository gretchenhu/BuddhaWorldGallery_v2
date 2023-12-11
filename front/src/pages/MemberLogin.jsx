// MemberLogin.jsx
import Login from '../components/Login';
import "./MemberLogin.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MemberLogin = () => {
  // Handle the successful login scenario, e.g., redirect or update the UI
  const handleSuccessfulLogin = () => {
    // For example, redirect to the home page
    window.location.href = '/';
  };

  return (
    <div>
     <Navbar />
      <Login onSuccessfulLogin={handleSuccessfulLogin} />
      <Footer/>
    </div>
  );
};

export default MemberLogin;
