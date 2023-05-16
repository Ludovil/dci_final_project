import { MyContext } from '../context/context.js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);
	console.log('users profile 1: ', user);

	// cloudinary
	const [cloudinaryImages, setCloudinaryImages] = useState([]);

	useEffect(() => {
		const fetchCloudinaryImages = async () => {
			try {
				const response = await axios.post(
					'http://localhost:3000/cloud/images/cloudinary',
					{
						cloudinaryImageIds: user.cloudinaryImages,
					}
				);

				if (response.status === 200) {
					setCloudinaryImages(response.data.cloudinaryImages);
				} else {
					console.error('Failed to fetch Cloudinary images');
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (user && user.cloudinaryImages && user.cloudinaryImages.length > 0) {
			fetchCloudinaryImages();
		}
	}, [user]);

	//end of cloudinary

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
					{/* Display Cloudinary images */}
					{cloudinaryImages.map((image) => (
						<img
							key={image._id}
							src={image.imageUrl}
							alt="Cloudinary Image"
						/>
					))}
					<br />
					<button onClick={goToUpdatePage}>update</button>
					<button onClick={logoutUser}>Logout</button>
				</div>
			)}
		</div>
	);
}

export default Profile;
