import './discover-overview.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createChatStart } from '../../../redux/chat/chat.actions';
import { createStructuredSelector } from 'reselect';
import { selectAllThings } from '../../../redux/thing/thing.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const DiscoverOverview = ({ things, createChat, history, currentUserId }) => {
	const onItemClick = thing => {
		const { id, userId } = thing;

		createChat(currentUserId, id, userId);
		history.push('chat/');
	};
	return (
		<div className="discover">
			<section className="things-container">
				{things.map((thing, i) => (
					<ThingMenuItem
						onClick={onItemClick}
						key={i}
						thing={thing}
						currentUserId={currentUserId}
					/>
				))}
			</section>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	things: selectAllThings,
	currentUserId: selectCurrentUserId
});

const mapDispatchToProps = dispatch => ({
	createChat: (currentUserId, id, userId) =>
		dispatch(createChatStart(currentUserId, id, userId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DiscoverOverview)
);
