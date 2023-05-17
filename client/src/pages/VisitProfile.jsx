import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function VisitProfile() {
	const location = useLocation();

	const [instruments, setInstruments] = useState([]);

	useEffect(() => {
		const fetchInstruments = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/instruments/${location.state._id}`
				);
				setInstruments(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchInstruments();
	}, [location.state._id]);

	console.log('visit profile:', location?.state);
	return (
		<div>
			<h1>{location?.state?.userName}</h1>
			<img src={location?.state?.profile_image} alt="Profile Image" />
			<p>{location?.state?.formatted_address}</p>
			<p>{location?.state?.email}</p>

			<h2>Instruments :</h2>
			{instruments.map((instrument) => (
				<img
					key={instrument._id}
					src={instrument.imageUrl}
					alt="Cloudinary Image"
					style={{ width: '200px', marginLeft: '10px' }}
				/>
			))}
		</div>
	);
}

export default VisitProfile;
