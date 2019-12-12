import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { checkUserSession, resetError } from './redux/user/user.actions';
import {
	selectCurrentUser,
	selectLoginError
} from './redux/user/user.selector';

import Alert from 'react-bootstrap/Alert';
import ChatPage from './pages/chat/chat.component';
import DiscoverPage from './pages/discover/discover.component';
import { GlobalStyle } from './global.styles';
import Header from './common/components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import MyProfilePage from './pages/myprofile/myprofile.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import UploadThingPage from './pages/upload-thing/upload-thing.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const App = ({ checkUserSession, currentUser, error }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div>
			<GlobalStyle />
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/discover" component={DiscoverPage} />
				<Route
					path="/chat"
					render={() =>
						currentUser ? <ChatPage /> : <Redirect to="/signin" />
					}
				/>
				<Route path="/profile" component={MyProfilePage} />
				<Route
					exact
					path="/signin"
					render={() =>
						currentUser ? <Redirect to="/" /> : <SignInSignUpPage />
					}
				/>
				<Route
					path="/upload"
					render={() =>
						currentUser ? (
							<UploadThingPage />
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
			</Switch>

			<Alert show={error} dismissible variant={'danger'}>
				Error:{' '}
				{error
					? error.message
					: 'Somethin Wrong Happened. Try Again Later'}
			</Alert>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	error: selectLoginError
});
const mapDispatchToProps = dispatch => ({
	checkUserSession: user => dispatch(checkUserSession()),
	resetError: () => dispatch(resetError())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
