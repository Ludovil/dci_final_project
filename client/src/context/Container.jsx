import { MyContext } from './context.js';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Container({ children }) {
	const [position, setPosition] = useState(null);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			axios
				.get('http://localhost:3000/users/refresh', {
					headers: { token: localStorage.getItem('token') },
				})
				.then((res) => {
					if (res.data.success) {
						setUser(res.data.data);
					} else {
						console.log(res.data.message);
					}
				})
				// on the first render of the usersProfile.jsx the user was null
				// this is the way to fix it :
				.finally(() => {
					setIsLoading(false); // Set isLoading to false once fetching is done
				});
		} else {
			setIsLoading(false); // Set isLoading to false if no token is available
		}
	}, []);

	// Render loading state or placeholder content
	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<MyContext.Provider
			value={{
				position,
				setPosition,
				user,
				setUser,
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

Container.propTypes = {
	children: PropTypes.node.isRequired,
};
