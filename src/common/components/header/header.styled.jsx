import '../../styles/colors.scss';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
	display: flex;
	margin-bottom: 25px;
	width: 100%;
	height: 70px;
	justify-content: space-between;

	@media screen and (max-width: 800px) {
		height: 60px;
		padding: 10px;
		margin-bottom: 20px;
	}
`;

export const LogoContainer = styled(Link)`
	padding: 25px;
	width: 70px;
	height: 100%;
	.logo {
		width: 100px;
		transition: 0.2s ease-in-out, padding;

		&:hover {
			transform: scale(1.15);
		}
	}
	@media screen and (max-width: 800px) {
		width: 50px;
		padding: 0;
		.logo {
			width: 70px;
		}
	}
`;

export const OptionsContainer = styled.div`
	display: flex;
	width: 60%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;

	@media screen and (max-width: 800px) {
		width: 80%;
	}

	.thing {
		background-color: var(--primary);
		color: white;
		font-weight: bold;
		transition: 0.2s ease-in-out, padding;
		border-radius: 25px;
		text-align: center;

		@media screen and (max-width: 800px) {
			padding: 4px;
		}

		&:hover {
			transform: scale(1.05);
			color: white;
			border: none;
			text-decoration: none;
		}
	}
`;

export const OptionLink = styled(Link)`
	cursor: pointer;
	text-decoration: none;
	padding: 10px 15px;
	&:hover {
		color: black;
		text-decoration: none;
	}
`;
