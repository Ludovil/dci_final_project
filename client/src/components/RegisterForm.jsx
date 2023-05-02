//import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
	//
	const registerUser = (e) => {
		e.preventDefault();
		console.log('click');
		const user = {
			userName: e.target.userName.value,
			email: e.target.email.value,
			password: e.target.password.value,
			profile_image: e.target.profileImage.value,
			address: {
				country: e.target.country.value,
				city: e.target.city.value,
				postcode: e.target.postcode.value,
				street: e.target.street.value,
				housenumber: e.target.housenumber.value,
			},
		};
		console.log(user);
		axios
			.post('http://localhost:3000/users', JSON.stringify(user), {
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
	//
	return (
		<div className="form">
			<form onSubmit={registerUser}>
				<label htmlFor="">
					UserName <input type="text" name="userName" />
				</label>
				<label htmlFor="">
					Email <input type="email" name="email" />
				</label>
				<label htmlFor="">
					Password <input type="password" name="password" />
				</label>
				<label htmlFor="">
					Profile Image <input type="file" name="profileImage" />
				</label>
				<label htmlFor="">
					Country <input type="text" name="country" />
				</label>
				<label htmlFor="">
					City <input type="text" name="city" />
				</label>
				<label htmlFor="">
					Postcode <input type="text" name="postcode" />
				</label>
				<label htmlFor="">
					Street <input type="text" name="street" />
				</label>
				<label htmlFor="">
					House Number <input type="text" name="housenumber" />
				</label>
				<button>submit</button>
			</form>
		</div>
	);
}

export default RegisterForm;
