import { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/context.js";
import "./navbar.css";
import Logo from "../Logo.jsx";

function NavBar() {
  const { user, setUser } = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const submenuRef = useRef(null);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleMouseEnter = () => {
    if (submenuRef.current) {
      submenuRef.current.style.display = "flex";
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMouseLeave = () => {
    if (submenuRef.current) {
      submenuRef.current.style.display = "none";
    }
  };

  // close hamburger menu by scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowMobileMenu(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <Logo className="logo" />
      <ul className={`menu ${showMobileMenu ? "show" : ""}`}>
        <li>
          <NavLink to="/" className="navlink home">
            Home
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/map" className="navlink map">

            Map
          </NavLink>
        </li> */}
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
          <li
            style={{ margin: "0" }}
            className={`profile-link ${menuOpen ? "active" : ""}`}
            // onMouseLeave={toggleMobileMenu}
          >
            {/* issue with navlink profile */}
            <span
              //to="/profile"
              className="navlink profile"
              onClick={handleProfileClick}
            >
              profile
            </span>
            <ul className="submenu" ref={submenuRef} onClick={toggleMobileMenu}>
              <li>
                <NavLink
                  to="/profile"
                  className="navlink sub-profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Go to
                </NavLink>
              </li>
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
                  to="/"
                  className="navlink logout"
                  onClick={() => {
                    setMenuOpen(false);
                    logoutUser();
                  }}
                >
                  Log out
                </NavLink>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register" className="navlink register">
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="navlink login">
                Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div id="mobile">
        {!showMobileMenu && (
          <i className="fas fa-bars mobile-icon" onClick={toggleMobileMenu}></i>
        )}

        {showMobileMenu && (
          <i className="fas fa-times mobile-icon" onClick={closeMobileMenu}></i>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
