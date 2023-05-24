import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../context/context.js';

function VisitProfile() {
	const location = useLocation();
	const history = useNavigate();
	const { user } = useContext(MyContext);
	const createConversation = async () => {
		try {
			const res = await axios.post(
				'http://localhost:3000/conversations',
				{
					guest: user._id,
					host: location?.state?._id,
				}
			);
			history('/messenger/' + res.data._id);
		} catch (err) {
			console.log(err);
		}
	};
	console.log('visit profile:', location?.state);

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
			<div>
				<h1>{location?.state?.userName}</h1>
				<h2>{location?.state?.email}</h2>

				<img
					style={{
						width: '400px',
						height: '400px',
						borderRadius: '10%',
						objectFit: 'cover',
					}}
					src={location?.state?.profile_image}
					alt="Profile Image"
				/>

				<button onClick={createConversation}>Send Message</button>
			</div>

			<div>
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
		</div>
	);
}

export default VisitProfile;
