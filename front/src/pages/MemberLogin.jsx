// MemberLogin.jsx
import Login from '../components/Login';
import "./MemberLogin.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MemberLogin = () => {

  const handleSuccessfulLogin = () => {
    // Redirect to the home page cus root path
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
