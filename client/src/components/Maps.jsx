import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // lo usaría si no tuviera comentado lo siguiente
import { useLocation } from 'react-router-dom';

// const icon = L.icon({
//   iconUrl: './placeholder.png', --> tendría que tener este archivo
//   iconSize: [38, 38],
// });

// const icon = L.icon({
//   iconUrl: './placeholder.png',
//   iconSize: [38, 38],
//   opacity: 0,
// });

const ResetCenterView = ({ position = [51.505, -0.09] }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(L.latLng(position[0], position[1]), map.getZoom(), {
        animate: true,
      });
    }
  }, [position]);

  return null;
};

const Maps = () => {
  const [positionMap, setPositionMap] = useState([51.505, -0.09]);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    console.log(query.get('lat'));

    if (query.get('lat')) {
      setPositionMap([Number(query.get('lat')), Number(query.get('lon'))]);
    }
  }, [location.search]);

  return (
    <MapContainer
      center={positionMap}
      zoom={19}
      scrollWheelZoom={true}
      style={{ width: '70vw', height: '80vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXiDSHMCc2wp2xTFnocG'
      />
      {positionMap && (
        <Marker position={{ lat: positionMap[0], lon: positionMap[1] }}>
          <Popup>Hi!</Popup>
        </Marker>
      )}
      <ResetCenterView position={positionMap} />
    </MapContainer>
  );
};
export default Maps;
