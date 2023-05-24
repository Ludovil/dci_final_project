import { MyContext } from './context.js';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Container({ children }) {
  const [position, setPosition] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .get('http://localhost:3000/users/refresh', {
          headers: { token: localStorage.getItem('token') },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.data);
          } else {
            console.log(res.data.message);
          }
        });
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        position,
        setPosition,
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
