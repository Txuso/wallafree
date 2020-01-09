import './discover-category.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createChatStart } from '../../../redux/chat/chat.actions';
import { selectCategory } from '../../../redux/thing/thing.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selector';
import { withRouter } from 'react-router-dom';

const DiscoverCategory = ({ things, createChat, history, currentUserId }) => {
	const onItemClick = thing => {
		const { id, userId } = thing;

		createChat(currentUserId, id, userId);

		history.push('/chat');
	};
	return (
		<div className="discover">
			<section className="things-container">
				{things.length > 0 ? (
					things.map((thing, i) => (
						<ThingMenuItem
							onClick={onItemClick}
							key={i}
							thing={thing}
							currentUserId={currentUserId}
						></ThingMenuItem>
					))
				) : (
					<h3>Sorry no things available for this category :-(</h3>
				)}
			</section>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	things: selectCategory(ownProps.match.params.categoryId)(state),
	currentUserId: selectCurrentUserId(state)
});

const mapDispatchToProps = dispatch => ({
	createChat: (currentUserId, id, userId) =>
		dispatch(createChatStart(currentUserId, id, userId))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DiscoverCategory)
);
