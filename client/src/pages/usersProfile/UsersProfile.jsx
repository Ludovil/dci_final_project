import { MyContext } from "../../context/context.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Instruments from "../Instruments.jsx";
import "./usersProfile.css";

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  console.log(user.music_interests);

  const goToUpdatePage = () => {
    navigate("/profile/update");
  };

  return (
    <div className="container">
      {user && (
        <>
          <h1>{user.userName}</h1>
          <div>
            {user.profile_image && (
              <div className="containerImageProfile">
                <img
                  className="profileImage"
                  src={user.profile_image}
                  alt="Profile Image"
                />
              </div>
            )}
            <div className="containerPersonalInformation">
              <h3>Address: </h3>
              <p className="informationDatabase">{user.formatted_address}</p>
              <h3>Email:</h3>
              <p className="informationDatabase">{user.email}</p>
              <h3>Who I am:</h3>
              <p className="informationDatabase">{user.profile_description}</p>
              <h3>Interest:</h3>
              <div className="informationDatabase">
                {user.music_interests.map((item, index) => (
                  <ul key={index} className="interestList">
                    <li>{item}</li>
                  </ul>
                ))}
              </div>
              <button className="button" onClick={goToUpdatePage}>
                Update profile
              </button>
            </div>
            <div>
              <Instruments />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Profile;
