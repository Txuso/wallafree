import './discover-overview.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createChatStart } from '../../../redux/chat/chat.actions';
import { createStructuredSelector } from 'reselect';
import { selectAllThings } from '../../../redux/thing/thing.selectors';
import { withRouter } from 'react-router-dom';

const DiscoverOverview = ({ things, createChat, history }) => {
	const onItemClick = thing => {
		const { id, userId } = thing;
		createChat(id, userId);
		history.push('chat/' + id);
	};
	return (
		<div className="discover">
			<section className="things-container">
				{things.map((thing, i) => (
					<ThingMenuItem
						onClick={onItemClick}
						key={i}
						thing={thing}
					></ThingMenuItem>
				))}
			</section>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	things: selectAllThings
});

const mapDispatchToProps = dispatch => ({
	createChat: (id, userId) => dispatch(createChatStart(id, userId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DiscoverOverview)
);
