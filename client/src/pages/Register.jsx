import { useContext, useState } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import axios from "axios";
import { MyContext } from "../context/context.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);

  const [profileImage, setProfileImage] = useState({ file: "" });

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
      .post("/users", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          const token = res.headers.token;
          localStorage.setItem("token", token);
          setUser(res.data.data);
          navigate("/login");
        } else {
          console.log(res.data.message[0].error);
          const errorMessages = res.data.message;
          const errors = errorMessages.map((e) => e.error);
          toast.error(errors.join("\n\n"), {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          //alert(`${res.data.message[0].error}`);
        }
      });
  };

  // cancel registration process
  const onCancelClick = () => {
    // Redirect to the home page
    navigate("/");
  };

  return (
    <div className="register-page">
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
