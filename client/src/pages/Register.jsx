import RegisterForm from '../components/RegisterForm.jsx';
import { useState } from 'react';
import axios from 'axios';

function Register() {
	//states
	const [formData, setFormData] = useState({
		userName: '',
		email: '',
		password: '',
		profile_image: '',
		address: {
			country: '',
			city: '',
			postcode: '',
			street: '',
			housenumber: '',
		},
	});

	const [submitedInput, setSubmitedInput] = useState({
		userName: null,
		email: null,
		password: null,
		profile_image: null,
		address: {
			country: null,
			city: null,
			postcode: null,
			street: null,
			housenumber: null,
		},
	});

	//actions
	const onChangeHandler = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setSubmitedInput(formData);
		// remise à zero
		setFormData({
			userName: '',
			email: '',
			password: '',
			profile_image: '',
			address: {
				country: '',
				city: '',
				postcode: '',
				street: '',
				housenumber: '',
			},
		});
		console.log('state:', formData);
		axios
			.post('http://localhost:3000/users', JSON.stringify(formData), {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				if (res.data.success) {
					console.log('success');
				} else {
					console.log(res.data.message);
				}
			});
	};
	return (
		<div>
			<h1>Register</h1>
			<RegisterForm
				onChangeHandler={onChangeHandler}
				onSubmitHandler={onSubmitHandler}
				submitedInput={submitedInput}
				formData={formData}
			/>
		</div>
	);
}

export default Register;
