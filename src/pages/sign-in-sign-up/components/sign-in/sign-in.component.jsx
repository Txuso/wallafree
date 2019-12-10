import './sign-in.component.scss';

import { CustomButton, FormInput } from '../../../../common/components/index.js';
import React, { useState } from 'react';

// import { connect } from 'react-redux';

// import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [ userCredentials, setCredentials ] = useState({ email: '', password: '' });

	const { email, password } = userCredentials;
	const handleSubmit = async (event) => {
		// TODO:
		// event.preventDefault();
		// emailSignInStart(email, password);
	};

	const handleChange = (event) => {
		// TODO:
		// const { value, name } = event.target;
		// setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput name="email" type="email" label="email" value={email} handleChange={handleChange} required />

				<FormInput
					name="password"
					type="password"
					label="password"
					value={password}
					required
					handleChange={handleChange}
				/>
				<div className="sign-in-buttons">
					<CustomButton type="submit">Sign In</CustomButton>
					<CustomButton onClick={googleSignInStart} isGoogleSignIn type="button">
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

// const mapDispatchToProps = (dispatch) => ({
// 	googleSignInStart: () => dispatch(googleSignInStart()),
// 	emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password))
// });
// export default connect(null, mapDispatchToProps)(SignIn);
export default SignIn;
