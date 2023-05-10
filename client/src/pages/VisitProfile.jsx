import { NavLink, useLocation } from 'react-router-dom';

function VisitProfile() {
	const location = useLocation();

	console.log('visit profile:', location?.state);
	return (
		<div>
			<h1>{location?.state?.userName}</h1>
			<h2>{location?.state?.email}</h2>

			<img src={location?.state?.profile_image} alt="Profile Image" />
			<div>
				<NavLink to="/inbox" className="navlink">	
					<button>Send Message</button>	
				</NavLink>	
			</div>
		</div>
	
	);
}

export default VisitProfile;
