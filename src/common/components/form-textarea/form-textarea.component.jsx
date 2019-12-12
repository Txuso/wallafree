import './form-textarea.component.scss';

import React from 'react';

export const FormTextArea = ({ handleChange, label, ...otherProps }) => (
	<div className="group">
		{label ? <label className="textarea-label"> {label}</label> : null}
		<textarea
			className="form-textarea"
			onChange={handleChange}
			{...otherProps}
		/>
	</div>
);
