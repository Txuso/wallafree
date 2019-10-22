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
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;

	@media screen and (max-width: 800px) {
		width: 80%;
	}
	
	.thing {
		background-color: #ffde17;
		color: black;
		font-weight: bold;
		transition: .2s ease-in-out,padding;
		border-radius: 25px;

		&:hover {
		  background-color: #e6c300;
		  border: none;
		}
	}
`;

export const OptionLink = styled(Link)`
  cursor: pointer;
  padding: 10px 15px;
`;
