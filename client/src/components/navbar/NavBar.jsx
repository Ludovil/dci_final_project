import { useState, useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../context/context.js';
import './navbar.css';
import Logo from '../Logo.jsx';

function NavBar() {
  const { user, setUser } = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    // <nav style={{ position: 'relative', zIndex: '99' }}>
    <nav>
      <Logo className='logo' />
      <ul
        className={`menu ${showMobileMenu ? 'show' : ''}`}
        // onClick={() => setShowMobileMenu(false)}
      >
        <li>
          <NavLink to='/' className='navlink home'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/map' className='navlink map'>
            Map
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className='navlink about'>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact' className='navlink contact'>
            Contact
          </NavLink>
        </li>

        {user ? (
          <li
            style={{ margin: '0' }}
            className={`profile-link ${menuOpen ? 'active' : ''}`}
          >
            <span
              //to="/profile"
              className='navlink profile'
              onClick={handleProfileClick}
            >
              {user.userName}'s profile
            </span>
            {menuOpen && (
              <ul className='submenu'>
                <li>
                  <NavLink
                    to='/profile'
                    className='navlink sub-profile'
                    onClick={() => setMenuOpen(false)}
                  >
                    Go to
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/allconversations'
                    className='navlink allconversations'
                    onClick={() => setMenuOpen(false)}
                  >
                    Postbox
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/'
                    className='navlink logout'
                    onClick={() => {
                      setMenuOpen(false);
                      logoutUser();
                    }}
                  >
                    Log out
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <NavLink to='/register' className='navlink register'>
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' className='navlink login'>
                Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div id='mobile'>
        {!showMobileMenu && (
          <i className='fas fa-bars mobile-icon' onClick={toggleMobileMenu}></i>
        )}
        {showMobileMenu && (
          <i
            className='fas fa-times mobile-icon'
            //onClick={toggleMobileMenu}
            onClick={closeMobileMenu}
          ></i>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
