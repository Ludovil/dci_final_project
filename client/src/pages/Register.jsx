import { useContext, useState } from 'react';
import RegisterForm from '../components/RegisterForm.jsx';
import axios from 'axios';
import { MyContext } from '../context/context.js';

function Register() {
	const { setUser } = useContext(MyContext);
	const [formData, setFormData] = useState({
		userName: '',
		email: '',
		password: '',
		profile_image: '',
		country: '',
		city: '',
		postcode: '',
		street: '',
		housenumber: '',
	});

	const [profileImage, setProfileImage] = useState({ file: '' });

	console.log('profile image: ', profileImage.file);
	//actions
	const onChangeHandler = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	const handleFileUpload = async (e) => {
		//		const file = e.target.files[0];
		//console.log('file:', file);
		//const base64 = await convertToBase64(file);
		//console.log('base64:', base64);
		//console.log('formData before update:', formData.profile_image);
		//setFormData({ ...formData, profile_image: base64 });
		//console.log('formData after update:', formData.profile_image);
		//setProfileImage({ ...profileImage, file: base64 });
		setProfileImage({
			url: URL.createObjectURL(e.currentTarget.files[0]),
			file: e.currentTarget.files[0],
		});
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const formdata = new FormData();
		//const formData = {
		//userName: e.target.userName.value,
		formdata.set('username', formData.username);
		//email: e.target.email.value,
		formdata.set('email', formData.email);
		//password: e.target.password.value,
		formdata.set('password', formData.password);
		//profile_image: e.target.profile_image.value,
		//profile_image: profileImage.file,
		console.log('profile file', profileImage);
		if (profileImage.file)
			formdata.set('image', profileImage.file, 'profileImage');
		//formdata.set('profile_image', profileImage.file, 'profileImage');
		formdata.set(
			'address',
			JSON.stringify({
				country: e.target.country.value,
				city: e.target.city.value,
				postcode: e.target.postcode.value,
				street: e.target.street.value,
				housenumber: e.target.housenumber.value,
			})
		);
		// address: {
		// country: e.target.country.value,
		// city: e.target.city.value,
		// postcode: e.target.postcode.value,
		// street: e.target.street.value,
		// housenumber: e.target.housenumber.value,
		// },
		//};
		axios
			.post('http://localhost:3000/users', JSON.stringify(formData), {
				headers: { 'Content-Type': 'application/json' },
				//headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				if (res.data.success) {
					console.log('success');
					setUser(res.data.data);
				} else {
					console.log(res.data);
					console.log();
				}
			});
	};
	return (
		<div>
			<h1>Register</h1>
			<RegisterForm
				onChangeHandler={onChangeHandler}
				onSubmitHandler={onSubmitHandler}
				handleFileUpload={handleFileUpload}
				formData={formData}
			/>
		</div>
	);
}

export default Register;

function convertToBase64(file) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}
