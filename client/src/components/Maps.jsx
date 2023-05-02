import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // lo usaría si no tuviera comentado lo siguiente

// const icon = L.icon({
//   iconUrl: './placeholder.png', --> tendría que tener este archivo
//   iconSize: [38, 38],
// });

const position = [51.505, -0.09];

const icon = L.icon({
  iconUrl: './placeholder.png',
  iconSize: [38, 38],
  opacity: 0,
});

const ResetCenterView = (props) => {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
};

const Maps = (props) => {
  // const [position, setPosition] = useState([51.505, -0.09]);
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100% ' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXiDSHMCc2wp2xTFnocG'
      />
      {selectPosition && (
        <Marker position={locationSelection}>
          {/* <Marker position={locationSelection} icon={icon}> */}
          <Popup>Hi!</Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};
export default Maps;
