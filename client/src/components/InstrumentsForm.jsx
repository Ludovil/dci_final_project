import PropTypes from 'prop-types';


function InstrumentsForm({
	handleFileChange,
	handleImageDelete,
	handleImageUpload,
	handleToggleDeleteButtons,
	handleInstrumentDelete,
	fileNames,
	showDeleteButtons,
	instruments,
}) {
	return (
		<div className='carousel-container'>
			<h3>Instruments Gallery</h3>
			{/* Image upload form */}
			<label htmlFor="upload-input" className="custom-file-upload">
				import instruments pics
			</label>
			<input
				id="upload-input"
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			{fileNames.length > 0 && (
				<div>
					<h4>Selected Files:</h4>
					<ul className='u-list'>
						{fileNames.map((file, index) => (
							<li key={file.name} className='l-list' >
								<img className='u-list__image'
									src={file.image}
									alt={file.name}
									style={{
										width: '200px',
										marginLeft: '10px',
									}}
								/>
								<br />
							
								<button className='u-list__button'
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
			<button onClick={handleImageUpload} className='upload-image-button'>Upload Images</button>

			{/* Show/hide delete buttons */}
			<button onClick={handleToggleDeleteButtons} className='delete-button'>
				{showDeleteButtons ? 'cancel' : 'remove instruments'}
			</button>
			<br />

			{/* Read the images */}
			{instruments.map((instrument) => (
				
				 <div className='carousel-container__image'
					key={instrument._id}
					style={{ display: 'flex', alignItems: 'center' }}
				> 
					<img className='carousel-container__image'
						src={instrument.imageUrl}
						alt="Cloudinary Image"
						style={{  display: "block", maxWidth: "100%", height: "auto", width: "auto" }}
					/>

					{showDeleteButtons && (
						<button className='carousel-container__button'
							onClick={() =>
								handleInstrumentDelete(instrument._id)
							}
						>
							Delete
						</button>
					)}
				</div>
				 
			))}
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
};
export default InstrumentsForm;
