import './chat-messages.component.scss';

import Message from '../message/message.component';
import MessageContainer from '../message-container/message-container.component';
import React from 'react';

const ChatMessages = () => (
	<div className="chat">
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
		<Message
			time="11:00"
			message="Hello!! I'm interested in your article"
			left={true}
		/>

		<Message time="11:01" message="Hello My friend" left={false} />
		<MessageContainer />
	</div>
);

export default ChatMessages;
