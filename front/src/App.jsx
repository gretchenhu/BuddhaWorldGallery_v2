import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ArtifactDetail from "./pages/ArtifactDetail";
import { EditArtifact } from "./pages/EditArtifact";
import CreateArtifact from "./pages/CreateArtifact";
import GalleryPage from "./pages/Gallery";
import "./App.css";

export default function App() {
  return (
    <div className="main-container">
      <Router>
        <Routes>
          <Route path="/" element={<GalleryPage category="/" />} />
          <Route path="/createartifact" element={<CreateArtifact />} />
          <Route path={`/buddha/id/:artifactId`} element={<ArtifactDetail />} />
          <Route
            path={`/buddha/edit/id/:artifactId`}
            element={<EditArtifact />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}
