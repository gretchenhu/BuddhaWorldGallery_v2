import { useEffect, useState } from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="footer section__padding">
      <div className="footer-links">
        <div className="footer-links_contact">
          <p>Made with 🧡</p>
        </div>
        <div className="footer-links_contact">
          {/* Use FontAwesomeIcon for YouTube icon without text */}
          <p className="icon youtube-icon">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="check out our YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </p>
          {/* Use FontAwesomeIcon for Instagram icon without text */}
          <p className="icon instagram-icon">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="check out our Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </p>
          {/* Use FontAwesomeIcon for Facebook icon without text */}
          <p className="icon facebook-icon">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="check out our Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </p>
        </div>
        <div className="footer-links_contact">
          <p>Get in touch ⬇</p>
          <p>600 California St, San Francisco, California</p>
          <p>866-866-7866</p>
          <p>info@buddhaworldgallery.com</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>@2023 BuddhaWorldGallery. All rights reserved</p>
      </div>
      {showTopBtn && (
        <div className="go-top" onClick={goTop}>
          Back to Top
        </div>
      )}
    </div>
  );
};

export default Footer;
