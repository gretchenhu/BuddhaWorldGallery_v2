import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./createArtifact.css";

export default function CreateArtifact() {
  const [artifactData, setArtifactData] = useState({
    dynasty: "",
    image: "",
    museum: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/buddha/artifact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artifactData),
    });

    if (response.ok) {
      const responseData = await response.json();
      alert("Artifact Created!");
      console.log("Success:", responseData);
      const artifactId = responseData.artifactId;
      navigate(`/buddha/id/${artifactId}`);
    } else {
      console.error("Error:", response.statusText);
      response
        .json()
        .then((json) => console.log(json))
        .catch((e) => console.log("Error parsing JSON:", e));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArtifactData({ ...artifactData, [name]: value });
  };

  return (
      <div className="container mt-5">
      <Navbar />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Upload New Artifact</h2>
            <br/>
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
                Upload Artifact
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>

  );
}

CreateArtifact.propTypes = {};
