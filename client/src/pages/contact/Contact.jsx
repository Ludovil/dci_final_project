import Logoo from '../../components/Logo-transparent.jsx';
import './contact.css';

function Contact() {
  return (
    <div className='page contact-page'>
      <h2>Contact us</h2>
      <div className='contact-container'>
        <div className='contact-presentation'>
          <div className='image-container'>
            <img
              src='
          ../../../public/guitar.jpg'
              alt='guitar_bed'
            />
          </div>
          <p>
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
        <div className='contact-form'>
          <form id='contact-form' method='POST'>
            <input
              name='name'
              type='text'
              className='form-control'
              placeholder='Your Name'
              required
            />
            <input
              name='email'
              type='email'
              className='form-control'
              placeholder='Your Email'
              required
            />
            <textarea
              name='message'
              className='form-control'
              placeholder='Message'
              rows='4'
              required
            ></textarea>
            <input
              type='submit'
              className='form-control submit'
              value='Send Message'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
