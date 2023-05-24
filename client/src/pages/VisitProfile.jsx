import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/context.js";
import axios from "axios";

function VisitProfile() {
  const location = useLocation();
  const history = useNavigate();
  const { user } = useContext(MyContext);
  const createConversation = async () => {
    try {
      const res = await axios.post("http://localhost:3000/conversations", {
        guest: user._id,
        host: location?.state?._id,
      });
      history("/messenger/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("visit profile:", location?.state);
  return (
    <div>
      <h1>{location?.state?.userName}</h1>
      <h2>{location?.state?.email}</h2>

      <img style={
								{ 	
									width: '400px',
									height: '400px',
									borderRadius: '10%',
									objectFit: 'cover'

								}
							} src={location?.state?.profile_image} alt="Profile Image" />
      <div>
        <button onClick={createConversation}>Send Message</button>
      </div>
    </div>
  );
}

export default VisitProfile;
