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
        .get("http://localhost:3000/users/refresh", {
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
      <div class="loader">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
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
