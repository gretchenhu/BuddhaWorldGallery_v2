import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function DeleteArtifact({ artifactId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this artifact?")) {
      try {
        const response = await fetch(`/api/buddha/id/${artifactId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Artifact deleted successfully");
          navigate("/");
        } else {
          alert("Failed to delete the artifact");
        }
      } catch (error) {
        alert("Error deleting artifact");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
}

DeleteArtifact.propTypes = {
  artifactId: PropTypes.string.isRequired,
};
