import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { MyContext } from "../context/context.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/users/login', { email, password })
      .then((res) => {
        if (res.data.success) {
          const token = res.headers.token;
          localStorage.setItem('token', token);
          console.log(res.data.data);
          setUser(res.data.data);
          navigate('/profile');
        } else {
          alert('something went wrong :( ');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="pic-background">
    <div className="auth-form-container">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <label >
          Email:{" "}
          <input className=".login-form input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input className=".login-form input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
      <p>
        You don&apos;t have an account yet?{" "}
        <a href="#" onClick={handleRegisterClick}>
          Register
        </a>
      </p>
    <div>
      <img className="login-logo"
        src="../../public/airbngig-low-resolution-logo-color-on-transparent-background.png"
        alt="airbngig-logo"
      />
    </div>
    </div>
    </div>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};

export default LoginForm;
