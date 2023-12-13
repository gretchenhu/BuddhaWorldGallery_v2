// current changes
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "../components/Login";
import CreateArtifact from "./CreateArtifact";
//import EditArtifact from "./EditArtifact";
//import DeleteArtifact from "./DeleteArtifact";

const AdminPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [showAdminLogin, setShowAdminLogin] = useState(true); // initially show admin login

    useEffect(() => {
        if (user && user.role === "admin") {
            setShowAdminLogin(false); // hide login form if user is already an admin
        }
    }, [user]);

    const handleAdminLoginSuccess = (adminUser) => {
        setShowAdminLogin(false);
        setUser(adminUser); // Update user context with admin user
    };

    if (showAdminLogin) {
        return (
            <Login 
                onClose={() => setShowAdminLogin(false)} 
                isAdminLogin={true}
                onSuccessfulLogin={handleAdminLoginSuccess}
            />
        );
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Admin functionalities */}
            <CreateArtifact />
        </div>
    );
};

export default AdminPage;
