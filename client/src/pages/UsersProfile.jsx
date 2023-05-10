import { MyContext } from '../context/context.js';
import { useContext } from 'react';

function Profile() {
	const { user, setUser } = useContext(MyContext);
	console.log('users profile: ', user);

	if (user) {
		return (
			<div>
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
	} else {
		console.log('where R u ? ');
	}
}

export default Profile;
