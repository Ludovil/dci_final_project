import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { MyContext } from '../context/context.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitHandler} className='form'>
        <label>
          Email:{' '}
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:{' '}
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};
export default LoginForm;