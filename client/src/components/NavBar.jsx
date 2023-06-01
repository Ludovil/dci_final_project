import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../context/context.js";
import "./navbar.css";

function NavBar() {
  const { user, setUser } = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="navlink logo">
            LOGO
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="navlink home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className="navlink map">
            Map
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="navlink about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navlink contact">
            Contact
          </NavLink>
        </li>
        {user ? (
          <li className={`profile-link ${menuOpen ? "active" : ""}`}>
            <NavLink
              to="/profile"
              className="navlink profile"
              onClick={handleProfileClick}
            >
              {user.userName}'s profile
            </NavLink>
            {menuOpen && (
              <ul className="submenu">
                <li>
                  <NavLink
                    to="/allconversations"
                    className="navlink allconversations"
                    onClick={() => setMenuOpen(false)}
                  >
                    Postbox
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    className="navlink logout"
                    onClick={() => {
                      setMenuOpen(false);
                      logoutUser();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register" className="navlink register">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="navlink login">
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
