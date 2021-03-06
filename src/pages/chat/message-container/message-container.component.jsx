import './message-container.component.scss';

import { FormTextArea } from '../../../common/components/form-textarea/form-textarea.component';
import React from 'react';

const MessageContainer = ({
	handleChange,
	placeholder,
	otherProps,
	onKeyPress,
	value
}) => (
	<div className="message-container">
		<FormTextArea
			{...otherProps}
			style={{ resize: 'none' }}
			required
			value={value}
			placeholder={placeholder}
			onKeyPress={onKeyPress}
			onChange={handleChange}
		/>
	</div>
);

export default MessageContainer;
