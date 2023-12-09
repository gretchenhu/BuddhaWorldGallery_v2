import "./footer.css";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener(`scroll`, () => {
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
          <h4>Made with 🧡</h4>
        </div>
        <div className="footer-links_contact">
          <h4>Socials</h4>
          <p>
            <a href="">YouTube</a>
          </p>
          <p>
            <a href="">Instagram</a>
          </p>
          <p>
            <a href="">Facebook</a>
          </p>
        </div>
        <div className="footer-links_contact">
          <h4>Get in touch</h4>
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
