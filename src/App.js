import { Route, Switch } from 'react-router-dom';

import ChatPage from './pages/chat/chat.component';
import { GlobalStyle } from './global.styles';
import Header from './common/components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import MyProfilePage from './pages/myprofile/myprofile.component';
import React from 'react';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import UploadThingPage from './pages/upload-thing/upload-thing.component';

function App() {
	return (
		<div>
			<GlobalStyle />
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/chat" component={ChatPage} />
				<Route path="/profile" component={MyProfilePage} />
				<Route exact path="/signin" component={SignInSignUpPage} />
				<Route exact path="/upload" component={UploadThingPage} />
			</Switch>
		</div>
	);
}

export default App;
