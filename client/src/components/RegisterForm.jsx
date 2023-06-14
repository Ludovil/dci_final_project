import PropTypes from "prop-types";
import "./registerForm.css";
function RegisterForm({
  onChangeHandler,
  onSubmitHandler,
  handleFileUpload,
  onCancelClick,
}) {
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={onSubmitHandler}>
        <div className="sub-register-form">
          <label>
            <span>UserName</span>
            <input type="text" name="userName" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>email</span>
            <input type="email" name="email" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>password</span>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              placeholder="Min 6 characters include a special one"
            />
          </label>
          <br />
          <label>
            <div className="file-label-1">Choose Image</div>
            <input
              className="file-input"
              type="file"
              name="profile_image"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </label>
          <div>
            <img
              className="register-logo"
              src="../../public/airbngig-low-resolution-logo-color-on-transparent-background.png"
              alt="airbngig-logo"
            />
          </div>
        </div>
        <br />
        <div className="sub-register-form">
          <label>
            <span>country</span>
            <input type="text" name="country" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>city</span>
            <input type="text" name="city" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>postcode</span>
            <input type="text" name="postcode" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>street</span>
            <input type="text" name="street" onChange={onChangeHandler} />
          </label>
          <br />
          <label>
            <span>housenumber</span>
            <input type="text" name="housenumber" onChange={onChangeHandler} />
          </label>
          <br />
          <div className="register-button-container">
            <button type="submit">Register</button>
            <button onClick={onCancelClick}>Cancel</button>
          </div>
          <br />
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  profile_image: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  postcode: PropTypes.string,
  street: PropTypes.string,
  housenumber: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  submitedInput: PropTypes.object,
  formData: PropTypes.object,
  handleFileUpload: PropTypes.func,
  onCancelClick: PropTypes.func,
};

export default RegisterForm;
