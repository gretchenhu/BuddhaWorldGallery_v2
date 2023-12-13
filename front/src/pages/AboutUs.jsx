import "./aboutUs.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />

      <div className="about-container">
        <div className="about-section">
          <h2>🪬The Enlightened Origins</h2>
          <p>
            Our gallery&apos;s story unfolds from a tapestry woven with threads
            of disorder and the ordinary, against which the vision for our space
            stood out starkly—a beacon of calm. It is said that an ethereal
            Buddha, in the stillness of a dream, whispered, &quot;Create a
            sanctuary, and tranquility will follow.&quot; Heeding this celestial
            advice, our journey began. The Buddha World Gallery was born from a
            collective of impassioned art aficionados, united by a reverence for
            the serene aesthetics of Buddhist tradition. From our humble
            beginnings, we have evolved into a distinguished haven, showcasing
            an eclectic collection of Buddhist art from every corner of the
            globe.
          </p>
          <p>
            🧡Special thanks to our museum curator friend Huiwen Liu, who
            generously provided us with her Buddha Artifacts dataset🧡
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
