import './message-container.component.scss';

import { FormTextArea } from '../../../common/components/form-textarea/form-textarea.component';
import React from 'react';

const MessageContainer = ({ handleChange, otherProps }) => (
	<div className="message-container">
		<FormTextArea
			{...otherProps}
			style={{ resize: 'none' }}
			required
			handleChange={handleChange}
		/>
	</div>
);

export default MessageContainer;
