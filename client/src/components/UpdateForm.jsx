import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';
import './form.css';
import options from '../musicgenres.js';

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
      target: { name: 'music_interests', value: selectedValues },
    });
  };

  // Find the selected options that match the user's music interests
  const selectedMusicInterests = options.filter((option) =>
    user.music_interests.includes(option.value)
  );
  return (
    <div className='auth-form-container'>
      <form className='register-form' onSubmit={onSubmitHandler}>
        <label>
          <span>UserName</span>
          <input
            type='text'
            name='userName'
            onChange={onChangeHandler}
            value={user.userName}
          />
        </label>
        <br />
        <label>
          <span>email</span>
          <input
            type='email'
            name='email'
            onChange={onChangeHandler}
            value={user.email}
          />
        </label>
        <br />
        <label>
          <span>password</span>
          <input
            type='password'
            name='password'
            onChange={onChangeHandler}
            placeholder="If you don't update your password it will stay the same"
          />
        </label>
        <br />
        <label>
          <span className='file-label'>Image Profile</span>
          <input
            type='file'
            name='profile_image'
            accept='.jpeg, .png, .jpg'
            //onChange={onChangeHandler}
            onChange={handleFileUpload}
          />
        </label>
        <br />
        {/* add description */}
        <label>
          <span>add description</span>
          <textarea
            maxLength={500}
            name='profile_description'
            onChange={onChangeHandler}
            placeholder={
              user.profile_description ? '' : 'Tell us more about you '
            }
            value={user.profile_description}
            style={{ resize: 'none' }}
          />
          {/* 
          <input
            type='text'
            name='profile_description'
            onChange={onChangeHandler}
            placeholder='who are you ?'
            value={user.description}
          /> */}
        </label>
        {/* end of description */}
        <br />
        {/* add music interests */}
        <label htmlFor='music_interests'>Music Interests</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={selectedMusicInterests}
          isMulti
          options={options}
          onChange={handleMusicInterestsChange}
        />
        {/* end of music interests */}

        <label>
          <span>country</span>
          <input
            type='text'
            name='country'
            onChange={onChangeHandler}
            value={user.country}
          />
        </label>
        <br />
        <label>
          <span>city</span>
          <input
            type='text'
            name='city'
            onChange={onChangeHandler}
            value={user.city}
          />
        </label>
        <br />
        <label>
          <span>postcode</span>
          <input
            type='text'
            name='postcode'
            onChange={onChangeHandler}
            value={user.postcode}
          />
        </label>
        <br />
        <label>
          <span>street</span>
          <input
            type='text'
            name='street'
            onChange={onChangeHandler}
            value={user.street}
          />
        </label>
        <br />
        <label>
          <span>housenumber</span>
          <input
            type='text'
            name='housenumber'
            onChange={onChangeHandler}
            value={user.housenumber}
          />
        </label>
        <br />
        <button type='submit'>Save</button>
        <button onClick={onCancelClick}>Cancel</button>
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
