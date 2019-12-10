import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ChatPage from './pages/chat/chat.component';
import { GlobalStyle } from './global.styles';
import Header from './common/components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import MyProfilePage from './pages/myprofile/myprofile.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import UploadThingPage from './pages/upload-thing/upload-thing.component';
import { checkUserSession } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

const App = ({ checkUserSession, currentUser }) => {
	useEffect(
		() => {
			checkUserSession();
		},
		[ checkUserSession ]
	);
	return (
		<div>
			<GlobalStyle />
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/chat" component={ChatPage} />
				<Route path="/profile" component={MyProfilePage} />
				<Route
					exact
					path="/signin"
					component={SignInSignUpPage}
					render={() => (currentUser ? <Redirect to="/" /> : <SignInSignUpPage />)}
				/>
				<Route exact path="/upload" component={UploadThingPage} />
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
	checkUserSession: (user) => dispatch(checkUserSession())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
