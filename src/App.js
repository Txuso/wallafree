import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { changeModalVisibility, resetAletInfo } from './redux/app/app.actions';
import { checkUserSession, resetError } from './redux/user/user.actions';
import { selectAlertInfo, selectIsModalShown, selectModalText } from './redux/app/app.selectors';
import { selectCurrentUser, selectLoginError } from './redux/user/user.selector';

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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const App = ({
	checkUserSession,
	currentUser,
	error,
	resetAletInfo,
	resetError,
	isModalShown,
	modalMessage,
	resetModalState,
	alertInfo
}) => {
	useEffect(
		() => {
			checkUserSession();
		},
		[ checkUserSession ]
	);

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
					render={() => (currentUser.userId !== '' ? <ChatPage /> : <Redirect to="/signin" />)}
				/>
				<Route
					path="/chat/:chatId"
					render={() => (currentUser.userId !== '' ? <ChatPage /> : <Redirect to="/signin" />)}
				/>
				<Route
					path="/profile"
					render={() => (currentUser.userId !== '' ? <MyProfilePage /> : <Redirect to="/signin" />)}
				/>
				<Route
					exact
					path="/signin"
					render={() => (currentUser.userId !== '' ? <Redirect to="/" /> : <SignInSignUpPage />)}
				/>
				<Route
					path="/upload"
					render={() => (currentUser.userId !== '' ? <UploadThingContainer /> : <Redirect to="/signin" />)}
				/>
			</Switch>
			<Alert show={alertInfo} onClose={() => resetAletInfo()} dismissible variant={'success'}>
				Info: {alertInfo ? alertInfo : ''}
			</Alert>
			<Alert show={error} onClose={() => resetError()} dismissible variant={'danger'}>
				Error: {error ? error.message : 'Something Wrong Happened. Try Again Later'}
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
	isModalShown: selectIsModalShown,
	modalMessage: selectModalText,
	alertInfo: selectAlertInfo
});
const mapDispatchToProps = (dispatch) => ({
	checkUserSession: (user) => dispatch(checkUserSession()),
	resetError: () => dispatch(resetError()),
	resetAletInfo: () => dispatch(resetAletInfo()),
	resetModalState: (isModalShown, modalMessage) => dispatch(changeModalVisibility(isModalShown, modalMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
