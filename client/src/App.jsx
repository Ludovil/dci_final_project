import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Map from './pages/Map.jsx';
import MapSearch from './pages/MapSearch.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Map />} />
        <Route path='/mapsearch' element={<MapSearch />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
