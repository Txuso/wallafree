import './chat-messages.component.scss';

import React, { useEffect, useRef, useState } from 'react';
import { getChatsStart, sendMessage } from '../../../redux/chat/chat.actions';

import Message from '../message/message.component';
import MessageContainer from '../message-container/message-container.component';
import { connect } from 'react-redux';
import { selectCurrentThingChat } from '../../../redux/chat/chat.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const ChatMessages = ({ sendMessage, userId, match, chat, getChatsStart }) => {
	const messagesEndRef = useRef(null);

	useEffect(() => {
		getChatsStart(userId);
	}, [getChatsStart, userId]);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [chat]);

	const [messageInfo, setMessage] = useState('');

	const handleChange = event => {
		const { value } = event.target;
		setMessage(value);
	};
	const onKeyPress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (messageInfo.length > 0) {
				sendMessage(messageInfo, match.params.thingId, userId);
			}
		}
	};

	return (
		<div className="chat">
			{chat && chat.messages && chat.messages.length > 0 ? (
				<div>
					{chat.messages.map((message, index) => (
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
				</div>
			) : null}
			<div ref={messagesEndRef} />

			<MessageContainer
				handleChange={handleChange}
				onKeyPress={onKeyPress}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	userId: selectCurrentUserId(state),
	chat: selectCurrentThingChat(ownProps.match.params.thingId)(state)
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (messageInfo, thingId, userId) =>
		dispatch(sendMessage(messageInfo, thingId, userId)),
	getChatsStart: userId => dispatch(getChatsStart(userId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ChatMessages)
);
