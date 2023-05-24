/*
import { MyContext } from '../context/context.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Instruments from './Instruments.jsx';

function Profile() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);
	console.log('users profile 1: ', user);

	const logoutUser = () => {
		localStorage.removeItem('token');
		setUser(null);
		navigate('/login');
	};

	const goToUpdatePage = () => {
		navigate('/profile/update');
	};

	return (
		<div>
			{user && (
				<div>
					<h2>{user.userName}</h2>
					{user.profile_image && (
						<img src={user.profile_image} alt="Profile Image" />
					)}
					<p>{user.formatted_address}</p>
					<p>{user.email}</p>

					<br />
					<button onClick={goToUpdatePage}>update profile</button>
					<button onClick={logoutUser}>Logout</button>
					<br />
					<Instruments />
				</div>
			)}
		</div>
	);
}

export default Profile;
*/

/*
//VERSION SOLO DE CREAR (1)
import React, { useState, useContext } from 'react';
import { MyContext } from '../context/context.js';
import PlaceForm from '../components/PlaceForm.jsx';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const completeProfile = () => {
    setShowForm(true);
  };

  const onFileChangeHandler = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const onCancel = () => {
    setShowForm(false);
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      titleInput.value = '';
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', profileImage);

    try {
      const response = await axios.post(
        'http://localhost:3000/places',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false); // Hide the form after successful submission
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div>
        {user && (
          <div>
            <h2>{user.userName}</h2>
            {user.profile_image && (
              <img src={user.profile_image} alt='Profile Image' />
            )}
            <br />
            <button onClick={completeProfile}>Complete your profile</button>
            {showForm ? (
              <div>
                <PlaceForm
                  onSubmitHandler={onSubmitHandler}
                  onFileChangeHandler={onFileChangeHandler}
                  onCancel={onCancel}
                />
              </div>
            ) : null}
            <br />
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    );
  } else {
    console.log('where R u ? ');
    return null;
  }
}

export default Profile;
*/

/*
// VERSION CON MODIFY/DELETE BUTTONS but without functionality (made by Naqvi) (2)
import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/context.js';
import PlaceForm from '../components/PlaceForm.jsx';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const completeProfile = () => {
    setShowForm(true);
  };

  const onFileChangeHandler = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const onCancel = () => {
    setShowForm(false);
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      titleInput.value = '';
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', profileImage);

    try {
      const response = await axios.post(
        'http://localhost:3000/places',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div>
        {user && (
          <div>
            <h2>{user.userName}</h2>
            {user.profile_image && (
              <img src={user.profile_image} alt='Profile Image' />
            )}
            <br />
            {user.apartments ? (
              <>
                <button>Modify your profile</button>
                <button>Delete your profile</button>
              </>
            ) : (
              <button onClick={completeProfile}>Complete your profile</button>
            )}
            {showForm ? (
              <div>
                <PlaceForm
                  onSubmitHandler={onSubmitHandler}
                  onFileChangeHandler={onFileChangeHandler}
                  onCancel={onCancel}
                />
              </div>
            ) : null}
            <br />
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    );
  } else {
    console.log('where R u ? ');
    return null;
  }
}

export default Profile;
*/

/*
// VERSION with functionality (3)
import React, { useState, useContext } from 'react';
import { MyContext } from '../context/context.js';
import PlaceForm from '../components/PlaceForm.jsx';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [apartmentImages, setApartmentImages] = useState([]);
  const [editMod, setEditMod] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const completeProfile = () => {
    setShowForm(true);
  };

  const onFileChangeHandler = (e) => {
    const files = e.target.files;
    setApartmentImages(files);
  };

  const onCancel = () => {
    setShowForm(false);
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      titleInput.value = '';
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', apartmentImages);

    try {
      const response = await axios.post(
        'http://localhost:3000/places',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandlerModifyApartment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', apartmentImages);

    try {
      const response = await axios.patch(
        `http://localhost:3000/places/${user.apartments._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // First try with Ludo
  // const deletePlaceByHost = async () => {
  //   console.log(user.apartments);
  //   try {
  //     axios.delete(`http://localhost:3000/places/${user.apartments}`, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         token: localStorage.getItem('token'),
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const deleteApartmentsProperty = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/${user._id}/apartments`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('Apartments deleted from user:', response.data.data);
        setUser(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaceByHost = async () => {
    try {
      await axios.delete(`http://localhost:3000/places/${user.apartments}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token'),
        },
      });

      deleteApartmentsProperty();
    } catch (error) {
      console.error(error);
    }
  };

  const modifyPlaceByHost = () => {
    setEditMod(true);
    setShowForm(true);
  };

  if (user) {
    return (
      <div>
        {user && (
          <div>
            <h2>{user.userName}</h2>
            {user.profile_image && (
              <img src={user.profile_image} alt='Profile Image' />
            )}
            <br />
            {user.apartments ? (
              <>
                <button onClick={modifyPlaceByHost}>Modify your profile</button>
                <button onClick={deletePlaceByHost}>Delete your profile</button>
              </>
            ) : (
              <button onClick={completeProfile}>Complete your profile</button>
            )}
            {showForm ? (
              <div>
                <PlaceForm
                  onSubmitHandler={
                    editMod ? onSubmitHandlerModifyApartment : onSubmitHandler
                  }
                  onFileChangeHandler={onFileChangeHandler}
                  onCancel={onCancel}
                  apartmentData={editMod && user.apartments}
                />
              </div>
            ) : null}
            <br />
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    );
  } else {
    console.log('where R u ? ');
    return null;
  }
}

export default Profile;
*/

// VERSION (4)
import React, { useState, useContext } from 'react';
import { MyContext } from '../context/context.js';
import PlaceForm from '../components/PlaceForm.jsx';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [apartmentImages, setApartmentImages] = useState([]);
  const [editMod, setEditMod] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const completeProfile = () => {
    setShowForm(true);
  };

  const onFileChangeHandler = (e) => {
    const files = e.target.files;
    setApartmentImages(files);
    // setApartmentImages((prevImages) => [...prevImages, ...files]);
  };

  const onCancel = () => {
    setShowForm(false);
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      titleInput.value = '';
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', apartmentImages);

    try {
      const response = await axios.post(
        'http://localhost:3000/places',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandlerModifyApartment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('host', user._id);
    formData.append('image', apartmentImages);

    try {
      const response = await axios.patch(
        `http://localhost:3000/places/${user.apartments._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('success');
        setUser(response.data.data);
        setShowForm(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // First try with Ludo
  // const deletePlaceByHost = async () => {
  //   console.log(user.apartments);
  //   try {
  //     axios.delete(`http://localhost:3000/places/${user.apartments}`, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         token: localStorage.getItem('token'),
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const deleteApartmentsProperty = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/${user._id}/apartments`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        console.log('Apartments deleted from user:', response.data.data);
        setUser(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaceByHost = async () => {
    try {
      await axios.delete(`http://localhost:3000/places/${user.apartments}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token'),
        },
      });

      deleteApartmentsProperty();
    } catch (error) {
      console.error(error);
    }
  };

  const modifyPlaceByHost = () => {
    setEditMod(true);
    setShowForm(true);
  };

  if (user) {
    return (
      <div>
        {user && (
          <div>
            <h2>{user.userName}</h2>
            {user.profile_image && (
              <img src={user.profile_image} alt='Profile Image' />
            )}
            <br />
            {user.apartments ? (
              <>
                {/* apartment displayed */}
                <h3>{user.apartments.title}</h3>
                <div>
                  <img src={user.apartments.image} alt='Apartment Image' />
                </div>
                {/* apartment displayed */}
                <button onClick={modifyPlaceByHost}>Modify your profile</button>
                <button onClick={deletePlaceByHost}>Delete your profile</button>
              </>
            ) : (
              <button onClick={completeProfile}>Complete your profile</button>
            )}
            {showForm ? (
              <div>
                <PlaceForm
                  onSubmitHandler={
                    editMod ? onSubmitHandlerModifyApartment : onSubmitHandler
                  }
                  onFileChangeHandler={onFileChangeHandler}
                  onCancel={onCancel}
                  apartmentData={editMod && user.apartments}
                />
              </div>
            ) : null}
            <br />
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    );
  } else {
    console.log('where R u ? ');
    return null;
  }
}

export default Profile;
