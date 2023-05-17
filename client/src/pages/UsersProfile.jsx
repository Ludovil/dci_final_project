import { MyContext } from '../context/context.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Instruments from './Instruments.jsx';

function Profile() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);
	console.log('users profile 1: ', user);

	const logoutUser = () => {
		localStorage.removeItem('token');
		setUser(null);
		navigate('/login');
	};

	const goToUpdatePage = () => {
		navigate('/profile/update');
	};

	return (
		<div>
			{user && (
				<div>
					<h2>{user.userName}</h2>
					{user.profile_image && (
						<img src={user.profile_image} alt="Profile Image" />
					)}
					<p>{user.formatted_address}</p>
					<p>{user.email}</p>

					<Instruments />
					<br />
					<button onClick={goToUpdatePage}>update</button>
					<button onClick={logoutUser}>Logout</button>
				</div>
			)}
		</div>
	);
}

export default Profile;
