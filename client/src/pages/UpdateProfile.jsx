import UpdateForm from '../components/UpdateForm.jsx';
import { MyContext } from '../context/context.js';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);

	const [formData, setFormData] = useState({
		userName: user.userName,
		email: user.email,
		password: '',
		//profile_image: '',
		country: user.address.country,
		city: user.address.city,
		postcode: user.address.postcode,
		street: user.address.street,
		housenumber: user.address.housenumber,
	});

	const onChangeHandler = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

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
		console.log(formData);
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
					navigate('/profile');
				} else {
					console.log(res.data.message);
				}
			});
	};
	return (
		<>
			<UpdateForm
				onChangeHandler={onChangeHandler}
				onSubmitHandler={onSubmitHandler}
				user={formData}
			/>
		</>
	);
}

export default UpdateProfile;
