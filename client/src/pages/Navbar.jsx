import { NavLink } from 'react-router-dom';

function NavBar() {
  const user = localStorage.getItem("user");
  
  return (
    <nav>
      <ul>
        <li><NavLink to="/"> Home </NavLink> </li>
        {user ? <li><NavLink to="/profile/:id">Profile </NavLink></li> : 
        <> <li><NavLink to="/login">Login </NavLink></li>
        <li><NavLink to="/register">Register </NavLink></li></>
        }
        <li><NavLink to="/map">Map </NavLink></li>
        <li><NavLink to="/profile/:id">Profile </NavLink></li>
        

        <li><NavLink to="mapsearch">MapSearch</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
