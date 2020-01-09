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
import { selectIsModalShown, selectModalText } from './redux/app/app.selectors';

import Alert from 'react-bootstrap/Alert';
import ChatPage from './pages/chat/chat.component';
import { CustomButton } from './common/components';
import DiscoverPage from './pages/discover/discover.component';
import { GlobalStyle } from './global.styles';
import Header from './common/components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import Logo from './assets/wallafree.png';
import Modal from 'react-bootstrap/Modal';
import MyProfilePage from './pages/myprofile/myprofile.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import UploadThingContainer from './pages/upload-thing/upload-thing.container';
import { changeModalVisibility } from './redux/app/app.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const App = ({
	checkUserSession,
	currentUser,
	error,
	info,
	resetInfo,
	resetError,
	isModalShown,
	modalMessage,
	resetModalState
}) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	const handleClose = () => {
		resetModalState(false, '');
	};

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
					: 'Something Wrong Happened. Try Again Later'}
			</Alert>
			<Modal show={isModalShown} onHide={handleClose} centered>
				<Modal.Body>
					<h3>{modalMessage}</h3>
					<img src={Logo} className="modal-logo" alt="" />
				</Modal.Body>
				<Modal.Footer>
					<CustomButton secondary onClick={handleClose}>
						Close
					</CustomButton>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	error: selectLoginError,
	info: selectInfoMessage,
	isModalShown: selectIsModalShown,
	modalMessage: selectModalText
});
const mapDispatchToProps = dispatch => ({
	checkUserSession: user => dispatch(checkUserSession()),
	resetError: () => dispatch(resetError()),
	resetInfo: () => dispatch(resetInfo()),
	resetModalState: (isModalShown, modalMessage) =>
		dispatch(changeModalVisibility(isModalShown, modalMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
