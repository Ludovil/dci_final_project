import PropTypes from 'prop-types';
import { useState } from 'react';
import './gallery.css';
import './Instruments.css';
import CloseIcon from '@mui/icons-material/Close';
import './instrumentsForm.css';

function InstrumentsForm({
  handleFileChange,
  handleImageDelete,
  handleImageUpload,
  handleToggleDeleteButtons,
  handleInstrumentDelete,
  fileNames,
  showDeleteButtons,
  instruments,
  isLoading,
  instrumentDescription,
  setInstrumentDescription,
}) {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  // to display the description when one image is displayed :
  const [description, setDescription] = useState('');

  // console.log(instruments);

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };
  return (
    <div>
      <h3>Instruments gallery</h3>
      {/* Image upload form */}
      <label
        htmlFor='upload-input'
        className='custom-file-upload file-label, buttonNegative'
      >
        Import instruments pics
      </label>
      <input
        id='upload-input'
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {/* version with ...loading */}
      {isLoading ? (
        <div style={{ margin: '15px' }}>...loading</div>
      ) : (
        fileNames.length > 0 && (
          <div>
            <h4>Selected files:</h4>
            <ul style={{ display: 'flex' }}>
              {fileNames.map((file, index) => (
                <li key={file.name}>
                  <img
                    src={file.image}
                    alt={file.name}
                    style={{
                      width: '200px',
                      marginLeft: '10px',
                    }}
                  />
                  <br />
                  <span>{file.name}</span>
                  <br />
                  <input
                    type='text'
                    name='description'
                    value={instrumentDescription[index] || ''}
                    onChange={(e) => {
                      const newDescriptions = [...instrumentDescription]; // Create a copy of the array
                      newDescriptions[index] = e.target.value; // Update the value at the corresponding index
                      setInstrumentDescription(newDescriptions); // Set the updated array
                    }}
                    placeholder='description'
                  />
                  <button onClick={() => handleImageDelete(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      <div className='gallery'>
        {instruments.map((item) => {
          return (
            <div
              className='pics'
              key={item._id}
              onClick={() => {
                getImg(item.imageUrl);
                setDescription(item.description);
              }}
            >
              <img
                src={item.imageUrl}
                alt=''
                key={item._id}
                style={{ width: '100%' }}
              />

              {/* <p>{item.description}</p> */}
              {showDeleteButtons && (
                <div className='delete-button-container'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // avoid triggering the previous onClick event (getImg())
                      handleInstrumentDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <br />
      <button className='buttonNegative' onClick={handleImageUpload}>
        Upload instruments
      </button>

      {/* Show/hide delete buttons */}
      <button className='buttonNegative' onClick={handleToggleDeleteButtons}>
        {showDeleteButtons ? 'Cancel' : 'Remove instruments'}
      </button>
      <br />
      {/* Read the images with Gallery */}
      <div className={model ? 'model open' : 'model'}>
        <img src={tempImgSrc} alt='' />
        <br />
        <p className='description'>{description}</p>
        <CloseIcon onClick={() => setModel(false)} />
      </div>
    </div>
  );
}
InstrumentsForm.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleImageDelete: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleToggleDeleteButtons: PropTypes.func.isRequired,
  handleInstrumentDelete: PropTypes.func.isRequired,
  fileNames: PropTypes.array.isRequired,
  showDeleteButtons: PropTypes.bool.isRequired,
  instruments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  instrumentDescription: PropTypes.array.isRequired,
  setInstrumentDescription: PropTypes.func.isRequired,
};
export default InstrumentsForm;
