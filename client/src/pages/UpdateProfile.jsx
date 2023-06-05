import UpdateForm from '../components/UpdateForm.jsx';
import { MyContext } from '../context/context.js';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);

  const [formData, setFormData] = useState({
    userName: user.userName,
    email: user.email,
    password: '',
    profile_image: user.profile_image,
    country: user.address.country,
    city: user.address.city,
    postcode: user.address.postcode,
    street: user.address.street,
    housenumber: user.address.housenumber,
  });

  const [profileImage, setProfileImage] = useState({ file: '' });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Profile Image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log('file:', file);
    const base64 = await convertToBase64(file);
    setProfileImage({ ...profileImage, file: base64 });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // avoid updating image with empty file
    const newProfileImage = profileImage.file
      ? profileImage.file
      : formData.profile_image;
    //
    const updatedFormData = {
      userName: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      profile_image: newProfileImage,
      address: {
        country: e.target.country.value,
        city: e.target.city.value,
        postcode: e.target.postcode.value,
        street: e.target.street.value,
        housenumber: e.target.housenumber.value,
      },
    };
    console.log(updatedFormData);
    axios
      .patch(
        `http://localhost:3000/users/${user._id}`,
        JSON.stringify(updatedFormData),
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          console.log('success');
          setUser(res.data.data);
          navigate('/profile');
        } else {
          console.log(res.data.message);
        }
      });
  };
  // cancel update process
  const onCancelClick = () => {
    // Redirect to profile
    navigate('/profile');
  };

  return (
    <>
      <UpdateForm
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        handleFileUpload={handleFileUpload}
        user={formData}
        onCancelClick={onCancelClick}
      />
    </>
  );
}

export default UpdateProfile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
