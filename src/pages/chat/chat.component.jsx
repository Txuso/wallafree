import './chat.component.scss';

import { Col, Row } from 'react-bootstrap';

import React from 'react';

const ChatPage = () => (
	<Row className="chat">
		<Col sm={4}>Chat List</Col>
		<Col sm={8}>Chat Messages</Col>
	</Row>
);

export default ChatPage;
