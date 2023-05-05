import { MyContext } from "../context/context.js";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(MyContext);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };




  if (user) {
    return (
      <div>
        <h1>Profile</h1>
        <div>
          {user && (
            <>
              <h2>
                {user.userName} 
              </h2>
              <h3>{user.email}</h3>
              <img src={user.profile_image} alt="" />{" "}
              <ul>
                <li>{user.address.country}</li>
                <li>{user.address.city}</li>
                <li>{user.address.postcode}</li>

              </ul>
            </>
          )}
          <button onClick={logoutUser}>logout</button>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
