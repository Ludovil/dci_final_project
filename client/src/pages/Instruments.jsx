import { MyContext } from '../context/context.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function Instruments() {
	const { user } = useContext(MyContext);
	const [instruments, setInstruments] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [fileNames, setFileNames] = useState([]);
	const [imageSelection, setImageSelection] = useState([]);

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

	//
	return (
		<div>
			<h3>Instruments Gallery</h3>
			{/* Image upload form */}
			<input
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
			{fileNames.length > 0 && (
				<div>
					<h4>Selected Files:</h4>
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
								<button
									onClick={() => handleImageDelete(index)}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			<br />
			<button onClick={handleImageUpload}>Upload Images</button>
			<br />
			<br />

			{instruments.map((instrument) => (
				<img
					key={instrument._id}
					src={instrument.imageUrl}
					alt="Cloudinary Image"
					style={{ width: '200px', marginLeft: '10px' }}
				/>
			))}
		</div>
	);
}

export default Instruments;
