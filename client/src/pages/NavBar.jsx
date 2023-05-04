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
				<li>
					<NavLink to="/mapsearch">Map Search</NavLink>
				</li>
				<li>
					<NavLink to="/register">Register</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
