import './chat-list-item.component.scss';

import React from 'react';

const ChatListItem = ({ chat, id, onClick }) => (
	<div onClick={() => onClick(id)} className="message-container">
		<img
			value={chat.imageUrl}
			id="avatar"
			alt=""
			className="avatar-rounded"
			src={chat.imageUrl}
		></img>
		<div className="item-description-wrapper">
			<h3>{chat.thingName}</h3>
			<label>{chat.userName}</label>
			{id}
		</div>
	</div>
);

export default ChatListItem;
