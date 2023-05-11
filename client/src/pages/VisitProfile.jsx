import { useLocation } from 'react-router-dom';

function VisitProfile() {
	const location = useLocation();

	console.log('visit profile:', location?.state);
	return (
		<div>
			<h1>{location?.state?.userName}</h1>
			<img src={location?.state?.profile_image} alt="Profile Image" />
			<p>{location?.state?.formatted_address}</p>
			<p>{location?.state?.email}</p>
		</div>
	);
}

export default VisitProfile;
