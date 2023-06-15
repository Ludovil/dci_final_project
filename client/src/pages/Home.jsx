import SearchBox from "../components/searchBox/SearchBox.jsx";
import About from "./About.jsx";
import Contact from "./contact/Contact.jsx";
import Cards from "./Cards.jsx";

function Home() {
  return (
    <>
      <div className="home-page">
        <SearchBox />
        <Cards />
        <About />
        <Contact />
      </div>
    </>
  );
}
export default Home;
