import { MyContext } from "./context.js";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./container.css";

export default function Container({ children }) {
  const [position, setPosition] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/users/refresh", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.data);
          } else {
            console.log(res.data.message);
          }
        })
        // on the first render of the usersProfile.jsx the user was null
        // this is the way to fix it :
        .finally(() => {
          setIsLoading(false); // Set isLoading to false once fetching is done
        });
    } else {
      setIsLoading(false); // Set isLoading to false if no token is available
    }
  }, []);

  // Render loading state or placeholder content
  if (isLoading) {
    return (
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    );
  }

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
