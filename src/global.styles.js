import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		padding: 20px 40px;
		font-family: Open Sans, sans-serif;

		@media screen and (max-width: 800px) {
			padding: 10px;
		}
	}

	a {
		text-decoration: none;
		color: black;
	}

	* {
		box-sizing: border-box;
	}

	.avatar-rounded {
		background-size: cover;
		border-radius: 50%;
		background-position: center;
		height: 100px;
		width: 100px;

	}

	.modal-content {
		color: white;
		background-color: var(--primary);
		text-align: center;
		min-height: 15rem;
		border: unset;
		
		.modal-header {
			border-bottom: unset;

		}
		.modal-footer {
			border-top: unset;
			justify-content: center;
		}
		.modal-logo {
			margin: 0 auto;
			width: 170px;
		}
	
	}

`;
