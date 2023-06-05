import { MyContext } from '../../context/context.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Instruments from '../Instruments.jsx';
import './usersProfile.css';

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);

  const goToUpdatePage = () => {
    navigate('/profile/update');
  };

  return (
    <div className='container'>
      {user && (
        <div>
          {user.profile_image && (
            <div className='containerImageProfile'>
              <img
                className='profileImage'
                src={user.profile_image}
                alt='Profile Image'
              />
            </div>
          )}
          <div className='containerPersonalInformation'>
            <h2>{user.userName}</h2>
            <p>Address: </p>
            <p className='informationDatabase'>{user.formatted_address}</p>
            <p>Email:</p>
            <p className='informationDatabase'>{user.email}</p>
            {/* <br /> */}
            <p>Who I am:</p>
            <p className='informationDatabase'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              adipisci quos cumque temporibus cum, neque beatae porro ipsa,
              quisquam autem voluptatum praesentium quis id. Qui animi
              recusandae corrupti aspernatur voluptas, laboriosam tenetur modi!
              Inventore soluta voluptatum, quidem architecto totam vero tenetur
              exercitationem provident! Modi pariatur amet necessitatibus nam
              voluptates odit libero, est distinctio minus eveniet blanditiis
              unde, illum aspernatur doloremque.
            </p>
            {/* ewradfsdfasdfasdfasdfasdf */}
            <div className='card'>
              <input id='card' type='checkbox' />
              <h3>PRUEBA</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
                illum laborum illo, ad, eveniet aut animi ut eos autem est qui
                totam commodi veritatis distinctio officiis repellendus.
                Officia, suscipit sed...
              </p>
              <div className='content'>
                <p>
                  Lorem Lorem Lorem Lorem, amet consectetur adipisicing elit.
                  Aspernatur officia omnis at modi molestias error ipsum ex odit
                  iure! Sunt impedit hic commodi maiores aspernatur eaque
                  perspiciatis iusto libero voluptatum accusantium optio,
                  architecto fuga amet unde odio qui accusamus quo.
                </p>
                <label for='card'>Show less</label>
              </div>
              <label className='buttonNegative, labelRead' for='card'>
                Read more...
              </label>
            </div>
            {/* ewradfsdfasdfasdfasdfasdf */}
            <p>Interest:</p>
            <p className='informationDatabase'>
              <ul className='interestList'>
                <li>Berlin</li>
                <li>rock</li>
                <li>metal</li>
                <li>band</li>
                <li>folk</li>
                <li>acoustic</li>
                <li>original music</li>
              </ul>
            </p>
            <button
              className='file-label, buttonNegative'
              onClick={goToUpdatePage}
            >
              Update profile
            </button>
          </div>

          <div className='containerInstrumentsGallery'>
            <Instruments />
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
