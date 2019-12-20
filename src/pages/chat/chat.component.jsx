import './chat.component.scss';

import { Col, Row } from 'react-bootstrap';

import ChatList from './chat-list/chat-list.component';
import ChatMessages from './chat-messages/chat-messages.component';
import React from 'react';

const ChatPage = () => (
	<Row className="chat">
		<Col sm={4}>
			<ChatList />
		</Col>
		<Col sm={8} className="chat-wrapper">
			<ChatMessages />
		</Col>
	</Row>
);

export default ChatPage;
