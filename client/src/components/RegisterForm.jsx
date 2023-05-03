import PropTypes from 'prop-types';

function RegisterForm({ onChangeHandler, onSubmitHandler, submitedInput }) {
	return (
		<div className="form">
			<form onSubmit={onSubmitHandler}>
				<label>
					<span>UserName</span>
					<input
						type="text"
						name="username"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>email</span>
					<input
						type="email"
						name="email"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>password</span>
					<input
						type="password"
						name="password"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>Image Profile</span>
					<input
						type="file"
						name="profile_image"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>country</span>
					<input
						type="country"
						name="country"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>city</span>
					<input type="city" name="city" onChange={onChangeHandler} />
				</label>
				<br />
				<label>
					<span>postcode</span>
					<input
						type="postcode"
						name="postcode"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>street</span>
					<input
						type="street"
						name="street"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<label>
					<span>street</span>
					<input
						type="street"
						name="street"
						onChange={onChangeHandler}
					/>
				</label>
				<br />
				<button type="submit">Register</button>
				<br />
			</form>
		</div>
	);
}

RegisterForm.propTypes = {
	username: PropTypes.string,
	email: PropTypes.string,
	password: PropTypes.string,
	profile_image: PropTypes.string,
	country: PropTypes.string,
	city: PropTypes.string,
	postcode: PropTypes.string,
	street: PropTypes.string,
	housenumber: PropTypes.string,
	onChangeHandler: PropTypes.func,
	onSubmitHandler: PropTypes.func,
	submitedInput: PropTypes.object,
	formData: PropTypes.object,
};

export default RegisterForm;
