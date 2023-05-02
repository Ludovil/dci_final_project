import { NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/map">Map</NavLink>
				</li>
				{/* <li>
					<NavLink to="/profile">profile</NavLink>
				</li> */}
				<li>
					<NavLink to="/register">register</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
