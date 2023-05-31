import React, { useState } from 'react';

function PlaceForm({
  onSubmitHandler,
  onFileChangeHandler,
  onCancel,
  apartmentData,
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    await onSubmitHandler(e);
    setSaved(true);
  };

  if (saved) {
    return <div>Apartment saved!</div>;
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Title:</label>
        <input type='text' name='title' defaultValue={apartmentData?.title} />
        <br />
        <label>Image:</label>
        <input
          type='file'
          name='image'
          accept='.jpeg, .png, .jpg'
          onChange={onFileChangeHandler}
        />
        <br />
        <button type='submit'>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default PlaceForm;
