import Footer from '../components/footer/Footer.jsx';
import SearchBox from '../components/searchBox/SearchBox.jsx';
import About from './About.jsx';
import Contact from './contact/Contact.jsx';

function Home() {
  return (
    <>
      <div className='homeContainer'>
        <SearchBox />
        <About />
        <Contact />
        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Home;
