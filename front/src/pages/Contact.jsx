import "./contact.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-word">🪷Contact Us🪷</h2>
        <p>
          Got questions, insights, or just want to share the sound of one hand
          clapping? Reach out and touch base with us. Whether you’re navigating
          the noble path or just need help with the website, we’re here like the
          sturdy banyan tree — providing shade and answers. From practical
          inquiries to profound wisdom, or if you’re simply pondering which
          incense pairs best with your meditation playlist, our inbox is open.
        </p>

        <p>Enlightenment may be just a message away!</p>

        <br/>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message"></textarea>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
