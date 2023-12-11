import { useContext } from 'react';
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; 
import { logoutUser } from '../../services/Authentication';
import "./navbar.css";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout function
      setUser(null); // Update the user state to null after logging out
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        BWG
      </Link>
      <ul>
        <CustomLink to="/">Gallery</CustomLink>
        {user ? (
          <li onClick={handleLogout}>Logout</li> // Logout link for logged-in users
        ) : (
          <CustomLink to="/MemberLogin">Member Login</CustomLink> // Member Login link for guests
        )}
        <CustomLink to="/Register">Register</CustomLink> 
        <CustomLink to="/AboutUs">About Us</CustomLink>
        <CustomLink to="/Contact">Contact</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
