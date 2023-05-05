import { useLocation } from 'react-router-dom';
import { MyContext } from '../context/context.js';
import { useContext } from 'react';

function Profile() {
	//states

	const location = useLocation();
	const { user } = useContext(MyContext);

	return (
		<div>
			<h1>{location?.state?.userName}</h1>
			{user && (
				<div>
					<h2>{user.userName}</h2>
					{user.profile_image && (
						<img src={user.profile_image} alt="Profile Image" />
					)}
				</div>
			)}
		</div>
	);
}

export default Profile;
