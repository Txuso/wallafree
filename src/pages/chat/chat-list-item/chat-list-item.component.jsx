import './chat-list-item.component.scss';

import { CustomButton } from '../../../common/components/index.js';
import React from 'react';
import { connect } from 'react-redux';
import { giveThingStart } from '../../../redux/thing/thing.actions';

const ChatListItem = ({ chat, id, onClick, giveThingStart, userId }) => {
	return (
		<div onClick={() => onClick(id)} className="chat-list-container">
			<img
				value={chat.imageUrl}
				id="avatar"
				alt=""
				className="avatar-rounded"
				src={chat.imageUrl}
			></img>
			<div className="item-description-wrapper">
				<h4>{chat.thingName}</h4>
				<label>{chat.userName}</label>
			</div>
			{userId === chat.userId ? (
				<CustomButton
					onClick={() => giveThingStart(chat.thingId, chat.userId)}
					className="give-button"
					secondary
				>
					Give
				</CustomButton>
			) : null}
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	giveThingStart: (thingId, userId) =>
		dispatch(giveThingStart(thingId, userId))
});
export default connect(null, mapDispatchToProps)(ChatListItem);
