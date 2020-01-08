import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
	checkUserSession,
	resetError,
	resetInfo
} from './redux/user/user.actions';
import {
	selectCurrentUser,
	selectInfoMessage,
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
import UploadThingContainer from './pages/upload-thing/upload-thing.container';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const App = ({
	checkUserSession,
	currentUser,
	error,
	info,
	resetInfo,
	resetError
}) => {
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
					exact
					path="/chat"
					render={() =>
						currentUser.userId !== '' ? (
							<ChatPage />
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
				<Route
					path="/chat/:chatId"
					render={() =>
						currentUser.userId !== '' ? (
							<ChatPage />
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
				<Route
					path="/profile"
					render={() =>
						currentUser.userId !== '' ? (
							<MyProfilePage />
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
				<Route
					exact
					path="/signin"
					render={() =>
						currentUser.userId !== '' ? (
							<Redirect to="/" />
						) : (
							<SignInSignUpPage />
						)
					}
				/>
				<Route
					path="/upload"
					render={() =>
						currentUser.userId !== '' ? (
							<UploadThingContainer />
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
			</Switch>
			<Alert
				show={info}
				onClose={() => resetInfo()}
				dismissible
				variant={'success'}
			>
				Info: {info ? info : ''}
			</Alert>
			<Alert
				show={error}
				onClose={() => resetError()}
				dismissible
				variant={'danger'}
			>
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
	error: selectLoginError,
	info: selectInfoMessage
});
const mapDispatchToProps = dispatch => ({
	checkUserSession: user => dispatch(checkUserSession()),
	resetError: () => dispatch(resetError()),
	resetInfo: () => dispatch(resetInfo())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
