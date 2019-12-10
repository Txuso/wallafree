import { CustomButtonContainer } from './custom-button.styled';
import React from 'react';

export const CustomButton = ({ children, ...props }) => (
	<CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);
