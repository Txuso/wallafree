import './message.component.scss';

import React from 'react';

const Message = ({ message, time, left }) => (
	<div className={`container ${left ? 'left' : ''}`}>
		<p className={`message`}>{message}</p>
		<span className={`time`}>{time}</span>
	</div>
);

export default Message;
