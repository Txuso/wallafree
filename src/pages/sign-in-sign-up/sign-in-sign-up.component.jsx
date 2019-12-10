import './sign-in-sign-up.component.scss';

import React from 'react';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

const SignInSignUpPage = () => (
	<div className="sign-in-and-sign-up">
		<h1>Sign In/Up Page</h1>
		<SignIn />
		<SignUp />
	</div>
);

export default SignInSignUpPage;
