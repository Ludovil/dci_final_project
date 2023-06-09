import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";
import "./updateForm.css";
import options from "../musicgenres.js";

const animatedComponents = makeAnimated();

function UpdateForm({
  onChangeHandler,
  onSubmitHandler,
  handleFileUpload,
  user,
  onCancelClick,
}) {
  const handleMusicInterestsChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    onChangeHandler({
      target: { name: "music_interests", value: selectedValues },
    });
  };

  // Find the selected options that match the user's music interests
  const selectedMusicInterests = options.filter((option) =>
    user.music_interests.includes(option.value)
  );
  return (
    <div className="update-auth-form-container">
      <form className=" update-form" onSubmit={onSubmitHandler}>
        <div className="sub-update-form">
          <label>
            <span>UserName</span>
            <input
              type="text"
              name="userName"
              onChange={onChangeHandler}
              value={user.userName}
            />
          </label>
          <br />
          <label>
            <span>email</span>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={user.email}
            />
          </label>
          <br />
          <label>
            <span>password</span>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              placeholder="If you don't update your password it will stay the same"
            />
          </label>
          <br />

          <label className="image-profile-container">
            <span className="file-label">Update profile image</span>
            <input
              type="file"
              name="profile_image"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </label>
          <br />
          {/* add profile description */}
          <label>
            <span>add description</span>
            <textarea
              maxLength={500}
              name="profile_description"
              onChange={onChangeHandler}
              placeholder={
                user.profile_description ? "" : "Tell us more about you "
              }
              value={user.profile_description}
              style={{ resize: "none", height: "200px" }}
            />
          </label>
        </div>
        {/* end of profile description */}
        <br />
        {/* add music interests */}
        <div className="sub-update-form">
          <label htmlFor="music_interests">
            Music Interests
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={selectedMusicInterests}
              isMulti
              options={options}
              onChange={handleMusicInterestsChange}
            />
          </label>

          {/* end of music interests */}
          <label>
            <span>country</span>
            <input
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={user.country}
            />
          </label>
          <br />
          <label>
            <span>city</span>
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={user.city}
            />
          </label>
          <br />
          <label>
            <span>postcode</span>
            <input
              type="text"
              name="postcode"
              onChange={onChangeHandler}
              value={user.postcode}
            />
          </label>
          <br />
          <label>
            <span>street</span>
            <input
              type="text"
              name="street"
              onChange={onChangeHandler}
              value={user.street}
            />
          </label>
          <br />
          <label>
            <span>housenumber</span>
            <input
              type="text"
              name="housenumber"
              onChange={onChangeHandler}
              value={user.housenumber}
            />
          </label>
          <br />
          <div className="update-buttons-container">
            <button type="submit">Save</button>
            <button onClick={onCancelClick}>Cancel</button>
          </div>
        </div>
        <br />
      </form>
    </div>
  );
}

UpdateForm.propTypes = {
  userName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  profile_image: PropTypes.string,
  profile_description: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  postcode: PropTypes.string,
  street: PropTypes.string,
  housenumber: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  submitedInput: PropTypes.object,
  user: PropTypes.object,
  handleFileUpload: PropTypes.func,
  onCancelClick: PropTypes.func,
};

export default UpdateForm;
