import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../context/context';

function NavBar() {
  const { user, setUser } = useContext(MyContext);
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav>
      <ul>
        <li><NavLink to="/"> Home </NavLink></li>
        <li><NavLink to="/map">Map</NavLink></li>
        <li><NavLink to="mapsearch">MapSearch</NavLink></li>
        {user ? (
          <>
            <li><NavLink to="/profile/:id">Profile</NavLink></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
