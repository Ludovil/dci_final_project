import { MyContext } from '../context/context.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import InstrumentsForm from '../components/instrumentsForm/InstrumentsForm.jsx';
function Instruments() {
  const { user } = useContext(MyContext);
  const [instruments, setInstruments] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [imageSelection, setImageSelection] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [instrumentDescription, setInstrumentDescription] = useState([]);
  // read instruments
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/instruments/',
          {
            instrumentsIds: user.instruments,
          }
        );
        if (response.status === 200) {
          setInstruments(response.data.instruments);
        } else {
          console.error('Failed to fetch Instruments');
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user && user.instruments && user.instruments.length > 0) {
      fetchInstruments();
    }
  }, [user]);
  // upload instruments
  const handleFileChange = (e) => {
    const files = e.target.files;
    const updatedSelectedImages = [...selectedImages];
    const updatedFileNames = [...fileNames];
    const updatedImageSelection = [...imageSelection];
    const updatedIntrumentDescription = [...instrumentDescription];
    for (let i = 0; i < files.length; i++) {
      updatedSelectedImages.push(files[i]);
      // Here, we store an object for each file name, containing both the name and the URL of the image created
      updatedFileNames.push({
        name: files[i].name,
        image: URL.createObjectURL(files[i]),
      });
      updatedImageSelection.push(true);
      updatedIntrumentDescription.push('');
    }
    setSelectedImages(updatedSelectedImages);
    setFileNames(updatedFileNames);
    setImageSelection(updatedImageSelection);
    setInstrumentDescription(updatedIntrumentDescription);
  };
  // delete one image before uploading it
  const handleImageDelete = (index) => {
    const updatedSelectedImages = [...selectedImages];
    const updatedFileNames = [...fileNames];
    const updatedImageSelection = [...imageSelection];
    const updatedIntrumentDescription = [...instrumentDescription];
    updatedSelectedImages.splice(index, 1);
    updatedFileNames.splice(index, 1);
    updatedImageSelection.splice(index, 1);
    updatedIntrumentDescription.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
    setFileNames(updatedFileNames);
    setImageSelection(updatedImageSelection);
    setInstrumentDescription(updatedIntrumentDescription);
  };
  const handleImageUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('userId', user._id);
      //formData.append('description', instrumentDescription); // Add instrumentDescription to the form data
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('files', selectedImages[i]);
        formData.append('description', instrumentDescription[i]);
      }
      console.log(formData);
      const response = await axios.post(
        'http://localhost:3000/instruments/filesupload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        //window.location.reload();
        setInstruments(response.data.instruments);
        setSelectedImages([]);
        setFileNames([]);
        setImageSelection([]);
        setInstrumentDescription([]);
        window.location.reload();
      } else {
        console.error('Failed to upload instrument images');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false after upload completes
    }
  };
  // show / hide delete buttons
  const handleToggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };
  // delete an image / instrument from the DB / collection
  const handleInstrumentDelete = async (instrumentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/instruments/${instrumentId}`
      );
      if (response.status === 200) {
        // Remove the deleted instrument from the state
        const updatedInstruments = instruments.filter(
          (instrument) => instrument._id !== instrumentId
        );
        setInstruments(updatedInstruments);
      } else {
        console.error('Failed to delete instrument');
      }
    } catch (error) {
      console.error(error);
    }
  };
  //
  return (
    <>
      <InstrumentsForm
        handleFileChange={handleFileChange}
        handleImageDelete={handleImageDelete}
        handleImageUpload={handleImageUpload}
        handleToggleDeleteButtons={handleToggleDeleteButtons}
        handleInstrumentDelete={handleInstrumentDelete}
        fileNames={fileNames}
        showDeleteButtons={showDeleteButtons}
        instruments={instruments}
        isLoading={isLoading}
        instrumentDescription={instrumentDescription}
        setInstrumentDescription={setInstrumentDescription}
      />
    </>
  );
}
export default Instruments;
