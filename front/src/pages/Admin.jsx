// current changes
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "../components/Login";
import CreateArtifact from "./CreateArtifact";
import EditArtifact from "./EditArtifact";
import DeleteArtifact from "./DeleteArtifact";

const AdminPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [showAdminLogin, setShowAdminLogin] = useState(true); // initially show admin login
    console.log("user role is after login", user.role);

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
            {user && user.role === "admin" ? (
                <>
                    <h1>Admin Dashboard</h1>
                    <CreateArtifact />
                    <EditArtifact />
                    <DeleteArtifact />
                </>
            ) : (
                <p>Access Denied. You must be an admin to view this page.</p>
            )}
        </div>
    );
            }    

export default AdminPage;
