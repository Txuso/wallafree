import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styled';

import Logo from '../../../assets/wallafree.png';
import React from 'react';

const Header = () => (
	<HeaderContainer>
		<LogoContainer to="/">
			<img src={Logo} className="logo" alt="" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/chat">CHAT</OptionLink>
			<OptionLink to="/profile">MY PROFILE</OptionLink>
			<OptionLink to="/signin">SIGN IN</OptionLink>
			<OptionLink className="thing" to="/upload">UPLOAD THING</OptionLink>
		</OptionsContainer>
	</HeaderContainer>
);

export default Header;
