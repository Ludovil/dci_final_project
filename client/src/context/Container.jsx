import { MyContext } from './context.js';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Container({ children }) {
	const [position, setPosition] = useState(null);
	const [user, setUser] = useState(null);

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