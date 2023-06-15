import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import "./map.css";

function Map() {
  const [users, setUsers] = useState([]);

  const URL = "";

  useEffect(() => {
    axios
      .get(`${URL}/users`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>
        <MapContainer
          style={{ position: "relative", zIndex: "2" }}
          center={[52.52, 13.405]}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {users.map((user) => {
            return (
              <div key={user._id}>
                <Marker position={user.geocode}>
                  <Popup>
                    {user.userName} <br />
                    {user.formatted_address} <br />
                    <Link to={`/visitprofile/${user._id}`} state={user}>
                      <button className="buttonNegative">Visit profile</button>
                    </Link>
                  </Popup>
                </Marker>
                ;
              </div>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
