import './chat-list.component.scss';

import React, { useEffect } from 'react';
import { getChatsStart, sendMessage } from '../../../redux/chat/chat.actions';

import ChatListItem from '../chat-list-item/chat-list-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllChatMessages } from '../../../redux/chat/chat.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const ChatList = ({ userId, history, chats, getChatsStart }) => {
	useEffect(
		() => {
			getChatsStart(userId);
		},
		[ getChatsStart, userId ]
	);

	useEffect(
		() => {
			// Run! Like go get some data from an API.
			const redirectToFirstChat = () => {
				if (chats.length > 0) {
					history.push('/chat/' + chats[0].id);
				}
			};

			redirectToFirstChat();
		},
		[ chats, history ]
	);

	const openChatConversation = (id) => {
		history.push('/chat/' + id);
	};
	return (
		<div className="chat-list">
			{chats ? (
				chats.map((chat, index) => (
					<ChatListItem onClick={() => openChatConversation(chat.id)} key={index} chat={chat} />
				))
			) : null}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	userId: selectCurrentUserId,
	chats: selectAllChatMessages
});

const mapDispatchToProps = (dispatch) => ({
	sendMessage: (messageInfo, thingId, userId) => dispatch(sendMessage(messageInfo, thingId, userId)),
	getChatsStart: (userId) => dispatch(getChatsStart(userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
