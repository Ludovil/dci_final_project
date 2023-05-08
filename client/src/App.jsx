import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import UsersProfile from './pages/UsersProfile.jsx';
import VisitProfile from './pages/VisitProfile.jsx';
import Map from './pages/Map.jsx';
import Register from './pages/Register.jsx';
import MapSearch from './pages/MapSearch.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/map" element={<Map />} />
				<Route path="/mapsearch" element={<MapSearch />} />
				<Route path="/profile" element={<UsersProfile />} />
				<Route path="/visitprofile/:id" element={<VisitProfile />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
