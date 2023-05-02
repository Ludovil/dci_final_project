import { useLocation } from 'react-router-dom';

function UserPage() {
	//states

	const location = useLocation();

	return (
		<div>
			<h1>{location?.state?.userName}</h1>
		</div>
	);
}

export default UserPage;
