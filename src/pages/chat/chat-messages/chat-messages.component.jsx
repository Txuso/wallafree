import './chat-messages.component.scss';

import React, { useEffect, useRef, useState } from 'react';
import { getChatMessages, sendMessage } from '../../../redux/chat/chat.actions';
import {
	selectAllChatMessages,
	selectCurrentChatMessages
} from '../../../redux/chat/chat.selectors';

import Logo from '../../../assets/wallafree.png';
import Message from '../message/message.component';
import MessageContainer from '../message-container/message-container.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const ChatMessages = ({
	sendMessage,
	userId,
	match,
	messages,
	getChatsStart,
	chats
}) => {
	const messagesEndRef = useRef(null);

	useEffect(() => {
		getChatsStart(match.params.chatId);
	}, [getChatsStart, match.params.chatId]);

	const scrollToBottom = () => {
		if (messagesEndRef && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(scrollToBottom, [messages]);

	const [messageInfo, setMessage] = useState('');

	const handleChange = event => {
		const { value } = event.target;

		setMessage(value);
	};
	const onKeyPress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (messageInfo.length > 0) {
				sendMessage(messageInfo, userId, match.params.chatId);

				setMessage('');
			}
		}
	};

	return (
		<div className="chat-messages-wrapper">
			{messages && messages.length > 0 ? (
				<div className="messages-wrapper">
					{messages.map((message, index) => (
						<Message
							key={index}
							message={message.message}
							left={message.userId !== userId}
							time={new Date(
								message.timestamp
							).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit'
							})}
						></Message>
					))}
					<div className="container empty" ref={messagesEndRef} />
				</div>
			) : null}
			{chats.length > 0 ? (
				<MessageContainer
					onKeyPress={onKeyPress}
					handleChange={handleChange}
					placeholder={'Write a message...'}
					value={messageInfo}
				/>
			) : (
				<div className="empty-chat">
					<h3>Ooops! No Conversation Available Yet</h3>
					<img src={Logo} className="modal-logo" alt="" />
				</div>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	userId: selectCurrentUserId,
	messages: selectCurrentChatMessages,
	chats: selectAllChatMessages
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (messageInfo, userId, id) =>
		dispatch(sendMessage(messageInfo, userId, id)),
	getChatsStart: chatId => dispatch(getChatMessages(chatId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ChatMessages)
);
