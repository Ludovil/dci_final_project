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
		<div>
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

			{/* Show/hide delete buttons */}
			<button onClick={handleToggleDeleteButtons}>
				{showDeleteButtons ? 'cancel' : 'remove instruments'}
			</button>
			<br />

			{/* Read the images */}
			{instruments.map((instrument) => (
				<div
					key={instrument._id}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<img
						src={instrument.imageUrl}
						alt="Cloudinary Image"
						style={{ width: '200px', marginLeft: '10px' }}
					/>

					{showDeleteButtons && (
						<button
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
