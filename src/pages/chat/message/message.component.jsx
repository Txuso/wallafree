import './message.component.scss';

import React from 'react';

const Message = ({ message, time, left }) => (
	<div className={`container ${left ? 'darker' : ''}`}>
		<p className={`message-${left ? 'right' : 'left'}`}>{message}</p>
		<span className={`time-${left ? 'left' : 'right'}`}>{time}</span>
	</div>
);

export default Message;
