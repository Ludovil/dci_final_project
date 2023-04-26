import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
	// states
	//const [user, setUser] = useState(null);
	const [marker, setMarker] = useState([]);

	const URL = 'http://localhost:3000';

	// action
	useEffect(() => {
		axios
			.get(`${URL}/users/6447fe383a1282652c316121`)
			.then((res) => {
				//console.log(res.data.data.geocode);
				setMarker(res.data.data.geocode);
			})
			.catch((err) => console.log(err));
	}, []);

	console.log(marker);

	// render
	return (
		<>
			<h1>Map test</h1>
			{/* <MapContainer center={[48.8566, 2.3522]} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker position={marker}></Marker>
			</MapContainer> */}
		</>
	);
}

export default App;
