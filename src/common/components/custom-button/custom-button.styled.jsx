import styled, { css } from 'styled-components';

const buttonStyles = css`
	background-color: var(--primary);
	color: white;
	border: none;
	border-radius: 5px;
	transition: 0.2s ease-in-out, padding;

	&:hover {
		transform: scale(1.05);
	}
`;

const secondaryButtonStyles = css`
	background-color: var(--secondary);
	color: white;
	border: none;
	border-radius: 5px;
	transition: 0.2s ease-in-out, padding;
	width: 5rem;

	&:hover {
		transform: scale(1.05);
	}
`;

const googleSignInStyles = css`
	background-color: white;
	color: var(--primary);
	border: solid 1px var(--primary);

	transition: 0.2s ease-in-out, padding;

	&:hover {
		transform: scale(1.05);
	}
`;

const getButtonStyles = props => {
	if (props.isGoogleSignIn) {
		return googleSignInStyles;
	}

	return props.secondary ? secondaryButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
	min-width: 165px;
	width: auto;
	height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	text-transform: uppercase;
	font-family: Open Sans, sans-serif;
	font-weight: bolder;
	cursor: pointer;
	display: flex;
	justify-content: center;
	${getButtonStyles};
`;
