import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styled';

import Logo from '../../../assets/wallafree.png';
import React from 'react';

const Header = () => (
	<HeaderContainer>
		<LogoContainer to="/">
			<img src={Logo} className="logo" alt="" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/contact">CONTACT</OptionLink>
			<OptionLink to="/shop">CHAT</OptionLink>
			<OptionLink to="/signin">SIGN IN</OptionLink>
		</OptionsContainer>
	</HeaderContainer>
);

export default Header;
