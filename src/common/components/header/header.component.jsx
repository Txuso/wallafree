import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styled';

import Logo from '../../../assets/wallafree.png';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { signOutStart } from '../../../redux/user/user.actions';

const Header = ({ currentUser, signOutStart }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<img src={Logo} className="logo" alt="" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/chat">CHAT</OptionLink>
			<OptionLink to="/profile">MY PROFILE</OptionLink>
			{currentUser ? (
				<OptionLink as="div" onClick={signOutStart}>
					SIGN OUT
				</OptionLink>
			) : (
				<OptionLink to="/signin">SIGN IN</OptionLink>
			)}
			<OptionLink className="thing" to="/upload">
				UPLOAD THING
			</OptionLink>
		</OptionsContainer>
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
