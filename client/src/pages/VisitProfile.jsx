import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../context/context.js';
import Rating from '../components/Rating.jsx';

function VisitProfile() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useContext(MyContext);
	const [instruments, setInstruments] = useState([]);
	const [reviewCount, setReviewCount] = useState(0);
	const [averageRating, setAverageRating] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const instrumentPromise = axios.get(
					`http://localhost:3000/instruments/${location.state._id}`
				);
				const reviewPromise = axios.get(
					`http://localhost:3000/users/${location.state._id}`
				);
				const averageRatingPromise = axios.get(
					`http://localhost:3000/users/${location.state._id}/averagerating`
				);

				const [
					instrumentResponse,
					reviewResponse,
					averageRatingResponse,
				] = await Promise.all([
					instrumentPromise,
					reviewPromise,
					averageRatingPromise,
				]);

				setInstruments(instrumentResponse.data);

				const { data: reviewData } = reviewResponse;
				const reviewCount = reviewData.data.reviews.length;
				setReviewCount(reviewCount);

				const { data: averageRatingData } = averageRatingResponse;
				const averageRating = averageRatingData.data.averageRating;
				setAverageRating(averageRating);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [location.state._id]);

	const createConversation = async () => {
		try {
			const res = await axios.post(
				'http://localhost:3000/conversations',
				{
					guest: user._id,
					host: location?.state?._id,
				}
			);
			navigate('/messenger/' + res.data._id);
		} catch (err) {
			console.log(err);
		}
	};

	console.log('visit profile:', location?.state);
	console.log('id: ', location.state._id);

	return (
		<div>
			<div>
				<Rating />
				<h1>{location?.state?.userName}</h1>

				<h2>{location?.state?.email}</h2>

				<img
					style={{
						width: '400px',
						height: '400px',
						borderRadius: '10%',
						objectFit: 'cover',
					}}
					src={location?.state?.profile_image}
					alt="Profile Image"
				/>

				<button onClick={createConversation}>Send Message</button>
			</div>

			<div>
				<p>{location?.state?.formatted_address}</p>
				<p>{location?.state?.email}</p>

				<h2>Instruments:</h2>
				{instruments.map((instrument) => (
					<img
						key={instrument._id}
						src={instrument.imageUrl}
						alt="Cloudinary Image"
						style={{ width: '200px', marginLeft: '10px' }}
					/>
				))}

				<h2>Reviews:</h2>
				<p style={{ color: 'red', display: 'inline' }}>
					Rating: <span>{reviewCount} || </span>
				</p>
				<p style={{ color: 'red', display: 'inline' }}>
					Average: <span>{averageRating}</span>
				</p>
				<div>
					{location.state?.reviews.map((review) => {
						return (
							<>
								<p>{review.reviewerUser?.userName}</p>
								<p>{review.rating}</p>
								<p>{review.comment}</p>
								<p>{review.createdAt}</p>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default VisitProfile;
