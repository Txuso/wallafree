import './chat-list-item.component.scss';

import React from 'react';

const ChatListItem = ({ chat, onClick }) => (
	<div onClick={() => onClick(chat.id)} className="message-container">
		{chat.userId}
	</div>
);

export default ChatListItem;
