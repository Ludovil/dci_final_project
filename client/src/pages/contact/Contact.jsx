import Logoo from "../../components/Logo-transparent.jsx";
import "./contact.css";

function Contact() {
  return (
    <div className="page contact-page">
      <div className="contact-title">Contact Us</div>
      <div className="contact-subtitle">
        We are here to help and answer any question you might have. We look
        forward to hearing from you.
      </div>
      <div className="contact-container">
        <div className="contact-form">
          <form id="contact-form" method="POST">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
            <br />
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Your Email"
              required
            />
            <br />
            <textarea
              name="message"
              className="form-control"
              placeholder="Message"
              rows="4"
              required
            ></textarea>
            <br />
            <input
              type="submit"
              className="form-control submit"
              value="SEND MESSAGE"
            />
          </form>
          <div className="Airbngig-info">
            <Logoo className="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
