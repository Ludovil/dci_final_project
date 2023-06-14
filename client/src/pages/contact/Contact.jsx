import axios from "axios";
import "./contact.css";
import toast from "react-hot-toast";

function Contact() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      contactName: e.target.name.value,
      contactEmail: e.target.email.value,
      contactMessage: e.target.message.value,
    };
    axios
      .post("http://localhost:3000/contact", formData)

      .then((res) => {
        console.log(res);
        toast.success("Thank you for your message!");
        //reset fields to empty values
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="page contact-page">
      <h2 className="contact-title">Contact us</h2>
      <div className="contact-container">
        <div className="contact-presentation">
          <div className="image-container">
            <img
              src="
          ../../../public/guitar.jpg"
              alt="guitar_bed"
            />
          </div>
          <p className="contact-para">
            Have a question or need assistance? We're here to help! Feel free to
            reach out to us using the contact form below. Whether you have
            inquiries about bookings, listings, or any other aspect of our
            platform, our dedicated support team is ready to assist you. We
            strive to provide prompt and personalized responses to ensure your
            experience with us is seamless. Simply fill out the form, and we'll
            get back to you as soon as possible. Thank you for choosing our
            platform for your accommodation needs!
          </p>
        </div>
        <div className="form-container">
          <div className="contact-form">
            <form className="sub-contact-form" onSubmit={onSubmitHandler}>
              <input
                className="contact-text"
                name="name"
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                className="contact-email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
              />
              <textarea
                className="contact-textarea"
                name="message"
                placeholder="Message"
                required
              ></textarea>
              <input
                type="submit"
                className="contact-submit"
                value="Send Message"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
