import { MyContext } from '../context/context.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Instruments from './Instruments.jsx';
function Profile() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);
	console.log('users profile 1: ', user);

	const goToUpdatePage = () => {
		navigate('/profile/update');
	};

	return (
		<div>
			{user && (
				<div>
					<h2>{user.userName}</h2>
					{user.profile_image && (
						<img src={user.profile_image} 
						style={{
							width: '400px',
							height: '400px',
							borderRadius: '10%',
							objectFit: 'cover',
						}} alt="Profile Image" />
					)}
					<p>{user.formatted_address}</p>
					<p>{user.email}</p>

					<br />
					<button onClick={goToUpdatePage}>update profile</button>
					<br />
					<Instruments />
				</div>
			)}
		</div>
	);
}
export default Profile;
