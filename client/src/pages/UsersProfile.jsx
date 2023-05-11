import { MyContext } from '../context/context.js';
import { useContext } from 'react';
// import UpdateForm from '../components/RegisterForm.jsx';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
	{
		/* 
	// open updating user
	const [isEditing, setIsEditing] = useState(false);
	const handleEditClick = () => {
		setIsEditing(true);
		//navigate('/profile/update');
	};
	const handleCancelClick = () => {
		setIsEditing(false);
	};

	//
	const [formData, setFormData] = useState({
		userName: '',
		email: '',
		password: '',
		profile_image: '',
		country: '',
		city: '',
		postcode: '',
		street: '',
		housenumber: '',
	});

	//
	const onChangeHandler = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};
	//
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const formData = {
			userName: e.target.userName.value,
			email: e.target.email.value,
			password: e.target.password.value,
			//profile_image: profileImage.file,
			address: {
				country: e.target.country.value,
				city: e.target.city.value,
				postcode: e.target.postcode.value,
				street: e.target.street.value,
				housenumber: e.target.housenumber.value,
			},
		};

		// Merge the updatedData with the existing user data
		//const formData = { ...user, ...updatedData };

		axios
			.patch(
				`http://localhost:3000/users/${user._id}`,
				JSON.stringify(formData),
				{
					headers: {
						'Content-Type': 'application/json',
						token: localStorage.getItem('token'),
					},
				}
			)
			.then((res) => {
				if (res.data.success) {
					console.log('success');
					setUser(res.data.data);
				} else {
					console.log(res.data.message);
				}
			});
	};
	//
*/
	}
	//if (user) {
	// if (isEditing) {
	// 	return (
	// 		<>
	// 			<UpdateForm
	// 				onChangeHandler={onChangeHandler}
	// 				onSubmitHandler={onSubmitHandler}
	// 				// handleFileUpload={handleFileUpload}
	// 				//formData={formData}
	// 			/>
	// 			<button type="button" onClick={handleCancelClick}>
	// 				Cancel
	// 			</button>
	// 		</>
	// 	);
	// } else {
	//
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
					<br />
					{/* <button onClick={handleEditClick}>Update</button> */}
					<button onClick={goToUpdatePage}>update</button>
					<button onClick={logoutUser}>Logout</button>
				</div>
			)}
		</div>
	);
}
// } else {
// 	console.log('usersProfile 1st render ?  ');
// }
//}
export default Profile;
