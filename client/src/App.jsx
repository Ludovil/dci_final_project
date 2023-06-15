import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/navbar/NavBar.jsx";
import Home from "./pages/Home.jsx";
import UsersProfile from "./pages/usersProfile/UsersProfile.jsx";
import VisitProfile from "./pages/visitProfile/VisitProfile.jsx";
import Map from "./pages/Map.jsx";
import Register from "./pages/Register.jsx";
import MapSearch from "./pages/MapSearch.jsx";
import Login from "./pages/Login.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Messenger from "./pages/messenger/Messenger";
import AllConversation from "./pages/allConversations/AllConversation";
import Footer from "./components/footer/Footer.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="app">
        <Toaster />
        <HashRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/mapsearch" element={<MapSearch />} />
            <Route path="/profile" element={<UsersProfile />} />
            <Route path="/visitprofile/:id" element={<VisitProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/messenger/:id" element={<Messenger />} />
            <Route path="/allconversations" element={<AllConversation />} />
          </Routes>
        </HashRouter>

        <div className="main-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
