import { useContext, useState } from 'react';
import { MyContext } from '../context/context.js';
import RegisterForm from '../components/RegisterForm.jsx';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(MyContext);

  // Form State
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [country, setCountry] = useState(user?.address?.country || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [postcode, setPostcode] = useState(user?.address?.postcode || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [housenumber, sethousenumber] = useState(
    user?.address?.housenumber || ''
  );

  const onChangeHandler = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      // ... handle other fields
      default:
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      userName,
      email,
      password,
      profile_image: profileImage,
      address: {
        country,
        city,
        postcode,
        street,
        housenumber: housenumber,
      },
    };

    axios
      .patch('http://localhost:3000/users', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log('success');
          setUser(res.data.data);
        } else {
          console.log(res.data.message);
        }
      });
  };

  // Render Profile
  if (user) {
    return (
      <div>
        <h2>{user.userName}</h2>
        {user.profile_image && (
          <img src={user.profile_image} alt='Profile Image' />
        )}
        <p>{user.formatted_address}</p>
        <p>{user.email}</p>
        <br />
        <RegisterForm
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          formData={{
            userName,
            email,
            password,
            // profile_image: profileImage, // uncomment if needed
            country,
            city,
            postcode,
            street,
            housenumber: housenumber,
          }}
        />
        <button onClick={logoutUser}>Logout</button>
      </div>
    );
  } else {
    console.log('User not found');
    return null;
  }
}

export default Profile;
