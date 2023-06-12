import { useEffect, useContext, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocation, Link } from "react-router-dom";
import { MyContext } from "../context/context.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./maps.css";

const ResetCenterView = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(L.latLng(position.lat, position.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [position]);

  return null;
};

const Maps = () => {
  const { position, setPosition } = useContext(MyContext);
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const URL = "http://localhost:3000";

  useEffect(() => {
    axios
      .get(`${URL}/users`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "90vh",
          zIndex: "-1",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXiDSHMCc2wp2xTFnocG"
        />
        {position && (
          <div style={{ backgroundColor: "red" }}>
            <Marker position={{ lat: position.lat, lon: position.lon }}>
              <Popup>You are here</Popup>
            </Marker>
          </div>
        )}
        <ResetCenterView position={position} />
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
  );
};
export default Maps;
