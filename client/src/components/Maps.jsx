import { useEffect, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../context/context.js';

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
	//console.log(location);

	return (
		<MapContainer
			center={[position.lat, position.lon]}
			zoom={19}
			scrollWheelZoom={true}
			style={{ width: '70vw', height: '80vh' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXiDSHMCc2wp2xTFnocG"
			/>
			{position && (
				<Marker position={{ lat: position.lat, lon: position.lon }}>
					<Popup>Hi!</Popup>
				</Marker>
			)}
			<ResetCenterView position={position} />
		</MapContainer>
	);
};
export default Maps;
