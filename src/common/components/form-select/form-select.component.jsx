import './form-select.component.scss';

import React from 'react';

export const FormSelect = ({
	handleChange,
	label,
	options,
	value,
	...otherProps
}) => (
	<div className="group">
		{label ? <label className="select-label"> {label}</label> : null}
		<select className="form-select" onChange={handleChange} {...otherProps}>
			{options.map(element => (
				<option key={element.value} value={element.value}>
					{element.label}
				</option>
			))}
		</select>
	</div>
);
