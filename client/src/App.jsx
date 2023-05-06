import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar.jsx';
import Home from './pages/Home.jsx';
import UsersProfile from './pages/UsersProfile.jsx';
import VisitProfile from './pages/VisitProfile.jsx';
import Map from './pages/Map.jsx';
import Register from './pages/Register.jsx';
import MapSearch from './pages/MapSearch.jsx';
import Login from './pages/Login.jsx';

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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
