import { MyContext } from '../context/context.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../Instruments.css';
import InstrumentsForm from '../components/InstrumentsForm.jsx';

function Instruments() {
	const { user } = useContext(MyContext);
	const [instruments, setInstruments] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [fileNames, setFileNames] = useState([]);
	const [imageSelection, setImageSelection] = useState([]);
	const [showDeleteButtons, setShowDeleteButtons] = useState(false);

	// console.log('instruments:', instruments);
	// console.log('selected images', selectedImages);
	// console.log('files names', fileNames);
	// console.log('images selection', imageSelection);

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
					console.error('Failed to fetch Cloudinary images');
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

		for (let i = 0; i < files.length; i++) {
			updatedSelectedImages.push(files[i]);
			// Here, we store an object for each file name, containing both the name and the URL of the image created
			updatedFileNames.push({
				name: files[i].name,
				image: URL.createObjectURL(files[i]),
			});
			updatedImageSelection.push(true);
		}

		setSelectedImages(updatedSelectedImages);
		setFileNames(updatedFileNames);
		setImageSelection(updatedImageSelection);
	};

	// delete one image before uploading it
	const handleImageDelete = (index) => {
		const updatedSelectedImages = [...selectedImages];
		const updatedFileNames = [...fileNames];
		const updatedImageSelection = [...imageSelection];

		updatedSelectedImages.splice(index, 1);
		updatedFileNames.splice(index, 1);
		updatedImageSelection.splice(index, 1);

		setSelectedImages(updatedSelectedImages);
		setFileNames(updatedFileNames);
		setImageSelection(updatedImageSelection);
	};

	const handleImageUpload = async () => {
		try {
			const formData = new FormData();
			formData.append('userId', user._id);

			for (let i = 0; i < selectedImages.length; i++) {
				formData.append('files', selectedImages[i]);
			}

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
				setInstruments(response.data.instruments);
				setSelectedImages([]);
				setFileNames([]);
				setImageSelection([]);
				window.location.reload();
			} else {
				console.error('Failed to upload instrument images');
			}
		} catch (error) {
			console.error(error);
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
		<InstrumentsForm
			handleFileChange={handleFileChange}
			handleImageDelete={handleImageDelete}
			handleImageUpload={handleImageUpload}
			handleToggleDeleteButtons={handleToggleDeleteButtons}
			handleInstrumentDelete={handleInstrumentDelete}
			fileNames={fileNames}
			showDeleteButtons={showDeleteButtons}
			instruments={instruments}
		/>
	);
}

export default Instruments;
