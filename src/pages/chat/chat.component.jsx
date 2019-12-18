import './chat.component.scss';

import { Col, Row } from 'react-bootstrap';

import ChatMessages from './chat-messages/chat-messages.component';
import React from 'react';

const ChatPage = () => (
	<Row className="chat">
		<Col sm={4}>Chat List</Col>
		<Col sm={8} className="chat-wrapper">
			<ChatMessages />
		</Col>
	</Row>
);

export default ChatPage;
