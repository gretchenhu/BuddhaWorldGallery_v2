import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./editArtifact.css";

export function EditArtifact() {
  const [artifactData, setArtifact] = useState({
    dynasty: "",
    image: "",
    museum: "",
    name: "",
  });
  const { artifactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtifact() {
      try {
        const response = await fetch(`/api/buddha/id/${artifactId}`);
        if (response.ok) {
          const data = await response.json();
          setArtifact(data);
        } else {
          alert("Failed to fetch artifact");
          console.error("Error fetching artifact details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchArtifact();
  }, [artifactId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtifact((prevArtifactData) => ({
      ...prevArtifactData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("YOOOO");
    try {
      const response = await fetch(`/api/buddha/id/${artifactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dynasty: artifactData.dynasty,
          image: artifactData.image,
          museum: artifactData.museum,
          name: artifactData.name,
        }),
      });

      if (response.ok) {
        alert("Artifact updated successfully!");
        navigate(`/buddha/id/${artifactId}`);
      } else {
        console.error("Error updating artifact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Navbar/>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Edit Artifact</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="dynasty">Dynasty</label>
            <div className="form-group mb-3">
              <input
                type="text"
                id="dynasty"
                name="dynasty"
                value={artifactData.dynasty}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <label htmlFor="imagelink">Image Link</label>
            <div className="form-group mb-3">
              <input
                type="text"
                id="imagelink"
                name="image"
                value={artifactData.image}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <label htmlFor="museum">Museum</label>
            <div className="form-group mb-3">
              <input
                type="text"
                id="museum"
                name="museum"
                value={artifactData.museum}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <label htmlFor="name">Name</label>
            <div className="form-group mb-3">
              <input
                type="text"
                id="name"
                name="name"
                value={artifactData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Artifact
            </button>
          </form>
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}

EditArtifact.propTypes = {};
