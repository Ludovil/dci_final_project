import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../context/context.js';

function NavBar() {
	const { user } = useContext(MyContext);

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" className="navlink">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/map" className="navlink">
						Map
					</NavLink>
				</li>
				{/* <li>
					<NavLink to="/mapsearch" className="navlink">
						Map Search
					</NavLink>
				</li> */}
				{user ? (
					<li>
						<NavLink to="/profile" className="navlink">
							Profile {user.userName}
						</NavLink>
					</li>
				) : (
					<>
						<li>
							<NavLink to="/register" className="navlink">
								Register
							</NavLink>
						</li>
						<li>
							<NavLink to="/login" className="navlink">
								Login
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default NavBar;
