import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import Map from './pages/Map.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/map" element={<Map />} />
				<Route path="/profile/:id" element={<UserPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
