import { useContext, useState } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import axios from "axios";
import { MyContext } from "../context/context.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  // const [formData, setFormData] = useState({
  // 	userName: '',
  // 	email: '',
  // 	password: '',
  // 	profile_image: '',
  // 	country: '',
  // 	city: '',
  // 	postcode: '',
  // 	street: '',
  // 	housenumber: '',
  // });

  const [profileImage, setProfileImage] = useState({ file: "" });

  // const onChangeHandler = (e) => {
  // 	const value = e.target.value;
  // 	setFormData({ ...formData, [e.target.name]: value });
  // };

  // Profile Image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const base64 = await convertToBase64(file);
    setProfileImage({ ...profileImage, file: base64 });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      userName: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      profile_image: profileImage.file,
      address: {
        country: e.target.country.value,
        city: e.target.city.value,
        postcode: e.target.postcode.value,
        street: e.target.street.value,
        housenumber: e.target.housenumber.value,
      },
    };
    axios
      .post("http://localhost:3000/users", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          const token = res.headers.token;
          localStorage.setItem("token", token);
          setUser(res.data.data);
          navigate("/login");
        } else {
          console.log(res.data.message);
        }
      });
  };

  // cancel registration process
  const onCancelClick = () => {
    // Redirect to the home page
    navigate("/");
  };

  return (
    <div>
      <RegisterForm
        //onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        handleFileUpload={handleFileUpload}
        //formData={formData}
        onCancelClick={onCancelClick}
      />
      {/* <button onClick={onCancelClick}>Cancel</button> */}
    </div>
  );
}

export default Register;

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
