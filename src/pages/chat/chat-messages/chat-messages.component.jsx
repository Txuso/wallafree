import './chat-messages.component.scss';

import React, { useEffect, useState } from 'react';
import { getChatsStart, sendMessage } from '../../../redux/chat/chat.actions';

import Message from '../message/message.component';
import MessageContainer from '../message-container/message-container.component';
import { connect } from 'react-redux';
import { selectCurrentThingMessages } from '../../../redux/chat/chat.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const ChatMessages = ({
	sendMessage,
	userId,
	match,
	messages,
	getChatsStart
}) => {
	useEffect(() => {
		getChatsStart(match.params.thingId);
	}, [getChatsStart, match.params.thingId]);

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
			{messages
				? messages.map(message => (
						<Message
							time="11:00"
							message="Hello!! I'm interested in your article"
							left={true}
						/>
				  ))
				: null}

			<MessageContainer
				handleChange={handleChange}
				onKeyPress={onKeyPress}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	userId: selectCurrentUserId,
	messages: selectCurrentThingMessages(ownProps.match.params.thingId)(state)
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (messageInfo, thingId, userId) =>
		dispatch(sendMessage(messageInfo, thingId, userId)),
	getChatsStart: thingId => dispatch(getChatsStart(thingId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ChatMessages)
);

/**
 * 	<Message time="11:01" message="Hello My friend" left={false} />

			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
			<Message
				time="11:00"
				message="Hello!! I'm interested in your article"
				left={true}
			/>

			<Message time="11:01" message="Hello My friend" left={false} />
 */
