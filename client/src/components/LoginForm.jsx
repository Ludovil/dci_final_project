import { useState } from 'react';
import axios from 'axios';
import Home from '../pages/Home';
import { useContext } from 'react';
import { MyContext } from '../context/context.js';

function LoginForm() {
	const { setUser } = useContext(MyContext); // 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false); // Add state to track whether the user is logged in
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		try {
			const response = await axios.post(
				'http://localhost:3000/users/login',
				user
			);
			console.log(response.data);
			setLoggedIn(true); // Set loggedIn state to true if login is successful
			setUser(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	if (loggedIn) {
		// If user is logged in, render profile component or navigate to the profile page
		return <Home />;
	}
	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<label htmlFor="">
					Email{' '}
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleEmailChange}
					/>
				</label>
				<label htmlFor="">
					Password{' '}
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</label>
				<button>submit</button>
			</form>
		</div>
	);
}
export default LoginForm;