import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../context/context.js';
import LogoutButton from './LogoutButton.jsx';

function NavBar() {
	const { user } = useContext(MyContext);

	return (
		<nav className='nav'>
			<ul>
				<li>
					<NavLink to="/" className="navlink home">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/map" className="navlink map">
						Map		
					</NavLink>
				</li>
				{user ? (
					<>
					<li>
						<NavLink to="/allconversations" className="navlink allconversations">Postbox
						</NavLink>
					</li> 
					<li>
						<NavLink to="/profile" className="navlink profile">
							 {user.userName}'s profile'
						</NavLink>
					</li>
					<li>
						<NavLink to="/logout" className="navlink logout">	
							<LogoutButton />	
						</NavLink>	
					</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/register" className="navlink register">
								Register
							</NavLink>
						</li>
						<li>
							<NavLink to="/login" className="navlink login">
								Login
							</NavLink>
						</li>
					</>
				)}
				<li>
					<NavLink to="/about" className="navlink about">
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="/contact" className="navlink contact">
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
