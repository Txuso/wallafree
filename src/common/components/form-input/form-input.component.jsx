import './form-input.component.scss';

import React from 'react';

export const FormInput = ({ handleChange, label, ...otherProps }) => (
	<div className="group">
		{label ? <label className="input-label"> {label}</label> : null}
		<input className="form-input" onChange={handleChange} {...otherProps} />
	</div>
);
